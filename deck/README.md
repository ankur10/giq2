# GrowthIQ 2.0 deck

A self-contained slide deck: `index.html`, `deck.css`, `deck.js`, `fonts/` and `assets/`. Nothing outside this folder is needed to present it.

- **Present from a file:** copy this folder to any machine and open `index.html` in Chrome.
- **Keys:** right arrow, space or a clicker for next; left arrow for back; F for fullscreen; 1-9 to jump.
- **Host it:** run `vercel deploy --prod` from inside this folder. `.vercelignore` leaves out the video's source and its screenshots.

`assets/` holds screenshots of a customer workspace and is not committed to git. Turn on Vercel's deployment protection before sharing a hosted link.

`video/` is the source of the video on slide 4 (see `docs/video-playbook.md`). It needs the rest of the repo and is not part of the hosted deck.
