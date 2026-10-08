// Generates the draft narration for the stage demo with the Mac's built-in speech voice:
// one file per step in assets/stage/voice/, and their lengths in stage/voice.json.
// A real recording replaces a line by overwriting its file; then run with --measure to
// refresh the lengths without regenerating anything.
//   node tools/make-voiceover.mjs [--measure]
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {lines, VOICE} from '../stage/narration.mjs';

const root = path.join(import.meta.dirname, '..'), dir = path.join(root, 'assets', 'stage', 'voice');
const measureOnly = process.argv.includes('--measure');
fs.mkdirSync(dir, {recursive: true});
const lengths = {};
for (const [id, line] of Object.entries(lines)) {
  const file = path.join(dir, id + '.m4a');
  if (!measureOnly) {
    const raw = path.join(dir, id + '.aiff');
    execFileSync('say', ['-v', VOICE.name, '-r', String(VOICE.rate), '-o', raw, line.say ?? line.text]);
    // Even loudness across lines, so the music bed can sit at one level under all of them.
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', raw, '-af', 'loudnorm=I=-17:TP=-2:LRA=7', '-ar', '44100', '-ac', '1', '-c:a', 'aac', '-b:a', '96k', file]);
    fs.rmSync(raw);
  }
  lengths[id] = Math.round(Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString()) * 100) / 100;
}
fs.writeFileSync(path.join(root, 'stage', 'voice.json'), JSON.stringify(lengths, null, 2) + '\n');
const total = Object.values(lengths).reduce((a, b) => a + b, 0);
console.log(`${Object.keys(lengths).length} lines, ${total.toFixed(1)}s of speech`);
