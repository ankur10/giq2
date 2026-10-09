# Video playbook

How the GrowthIQ product videos in this repo are made, and how to make another one. Every video is a web page that is played and captured, so picture, voice and music are all code and data in the repo. Nothing is edited by hand in a video editor.

## The three formats

| Format | Page | Use it for | Length | How it is captured |
| --- | --- | --- | --- | --- |
| Narrated demo | `stage.html?narrated` | Walking through the product as one story, with a voice-over | 2 to 3 min | Recorded live, then aligned to its soundtrack |
| Line film | `film.html` | A mood piece set to music, few words, no product walkthrough | about 1:40 | Frame by frame |
| Showcase reel | `reel.html` | Real product screens cut to music, with captions | about 1:00 | Frame by frame |

Pick the format first. They differ in what drives the timing:

- **The narrated demo is driven by the voice.** Each step lasts as long as its spoken line, and never less than its own animation needs.
- **The film and the reel are driven by the music.** Everything is placed on a grid of beats (100 beats per minute), and the picture is a pure function of the beat.

## One-time setup

- Node, Chrome and `ffmpeg` installed. `npm install` brings the rest.
- For the voice-over: an OpenAI key in `.env` at the repo root, as `OPENAI_API_KEY=...`. The file is ignored by git. Keep it that way.
- Build and serve the site before any capture, and after every change:

```bash
npm start
```

That serves on `http://127.0.0.1:8772/`. If the port is taken it picks another and prints it; pass that address to the export scripts with `--site` (narrated) or as the last argument (film and reel).

## Making a narrated demo

This is the pipeline to reuse most often.

### 1. Write the story as steps

`stage/story.mjs` holds the story: acts, and inside them steps. A step says which screen the camera is on, what it focuses on, what the cursor does, and `min`, the seconds its animation needs. The content shown on each screen is in the same file.

- One idea per step. If a step needs two sentences to explain, it is two steps.
- Use a fictional company and label invented figures as illustrative.
- Only stage what the product can do. Where a screen is staged beyond the product (today: the customer table, the "Request sent" confirmation, the board pack), write it down and get it approved before the video is shown.

### 2. Write the lines

`stage/narration.mjs` has one line per step:

- `text`: the line as spoken.
- `at`: seconds into the step at which it starts. Start the line just after the thing it describes appears.
- `pause`: seconds of silence between its sentences, for lines that must land on separate moments (such as three documents arriving one by one).

Keep lines short. A line of 10 to 12 words takes about 4 seconds. The voice sets the length of the video, so every extra word makes it longer and holds the picture still. Aim for a line that fits inside the step's own `min`.

### 3. Generate the voice

```bash
npm run voice
```

This calls OpenAI text-to-speech for every line, trims the silence at each end, evens out the loudness, and writes `assets/stage/voice/<step>.m4a` plus the measured lengths in `stage/voice.json`.

- To redo only some lines: `npm run voice -- clock market`.
- The voice, its instructions and its `tempo` (a small speed-up with the pitch kept) are the `VOICE` line at the top of `stage/narration.mjs`.
- The model's pace varies a little between runs and it ignores requests to speak faster. Use `tempo` to adjust pace.
- To use a human recording, save each line over the file of the same name and run `npm run voice -- --measure`. Every step's timing adjusts to the new lengths.

### 4. Music

`stage/soundtrack.mjs` generates the music bed in code and mixes it under the voice. It is written once and follows the story's timings by itself: chords alone under the opening, a pulse, then bass and drums, then one held chord at the close.

- `MUSIC_LEVEL` and `VOICE_LEVEL` at the top set the balance. Keep the bed about 10 dB under the voice, and the mix peak below 0 dBFS.
- Key, tempo and chord loop are the constants beneath them.
- The instruments are simple synthesised tones. For a produced sound, use a licensed track instead.

### 5. Check before exporting

```bash
npm test
```

The tests catch the structural mistakes: a step without a line, a line that runs into the next step, a step too short for its line or its animation.

Then watch it in the browser at `stage?narrated` (press space to begin).

### 6. Export

```bash
npm run video:narrated -- out/demo.mp4
npm run video:narrated -- out/demo-fast.mp4 --speed 1.5
```

- The export takes as long as the demo, plus about a minute. Leave the machine idle while it runs.
- `--speed` quickens the picture while the voice keeps its natural pace. Each step shrinks only as far as its line allows, so the result is faster than normal but usually short of the full figure. To get closer, shorten the lines.
- The script prints how fast the recording really ran. Anything more than 2% off means the machine was busy; export again.

### 7. Review

```bash
npm run video:sheet -- out/demo.mp4 out/demo.jpg
```

That lays 16 evenly spaced frames on one image. Check every act is there and nothing is blank or mid-transition. Then listen to the whole video once with headphones. Levels and timing are measured by the scripts, but only a person can judge how it sounds.

## Making a film or a reel

Both are placed on beats, not seconds.

- **Film:** `film/score.mjs` is the beat sheet (sections, words, camera stops). `film/line.mjs` and `film/Scene.jsx` draw it. `film/sound.mjs` is the score.
- **Reel:** `reel/shots.mjs` lists the shots: which screen, which regions lift off as panels, when, and from which side. `reel/sound.mjs` is the score.

For a reel of real product screens, capture them first:

```bash
node reel/capture.mjs https://giq2.ankurj.com/
```

That saves each screen to `assets/reel/` and records where every named region sits in `reel/regions.json`. Add a screen by adding a row to the list at the top of that script. The captures show whatever is on the live site, including real company names, so check what is on screen before the video is shown outside the company.

Export a range of seconds, frame by frame:

```bash
npm run video:export -- reel 0 58 out/reel.mp4
npm run video:export -- film 0 99 out/film.mp4
```

A long piece can be exported as several ranges in parallel and joined with `ffmpeg`.

## Rules that were learned the hard way

- **Never trust a live recording's timing by itself.** A screen recording can run several percent fast or slow. Pieces that can be stepped are exported frame by frame. The narrated demo cannot, so it flashes two markers and the export measures them.
- **Sync markers must be a colour no screen contains.** A white marker was once mistaken for a white product screen and the whole video was stretched. They are magenta, and are painted out of the final file.
- **Speed up the picture, never the finished audio.** Sped-up speech sounds rushed. Quicken the picture and render the soundtrack for the new timings.
- **Check the mix peak after changing the voice.** A new voice can be louder than the last one and clip.
- **A text that moves between screens must be set identically at both ends,** including optical size, or it re-wraps as it lands.
- **Reserve space for anything that appears later.** A confirmation that pushes the layout moves the button out from under the cursor.
- **Rebuild before capturing.** The capture reads `dist/`, not the source.
- **Do not commit the videos.** They go in `.impeccable/review/` or an `out/` folder. The voice files are small and are committed.

## Starting a new video from this one

Today `stage/` is one story, and the narrated export reads it directly. To make a second narrated video:

1. Copy `stage/story.mjs` and `stage/narration.mjs` to a new pair for the new story, and its screens under `stage/screens/` if it needs new ones.
2. Give it its own voice folder and `voice.json`.
3. Point the page and the two tools at the new pair.

Step 3 is a small change that has not been made yet, because there has only been one story. Make the tools take the story's name as an argument the first time a second story is written, and update this section.
