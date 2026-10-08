// Generates the narration for the stage demo with OpenAI's text-to-speech model: one file per
// step in assets/stage/voice/, and their lengths in stage/voice.json. Needs OPENAI_API_KEY,
// in the environment or in .env. A real recording replaces a line by overwriting its file;
// then run with --measure to refresh the lengths without regenerating anything.
//   node tools/make-voiceover.mjs [--measure] [step ids...]
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {lines, VOICE} from '../stage/narration.mjs';

const root = path.join(import.meta.dirname, '..'), dir = path.join(root, 'assets', 'stage', 'voice');
const args = process.argv.slice(2), measureOnly = args.includes('--measure'), only = args.filter(a => !a.startsWith('--'));
const key = process.env.OPENAI_API_KEY ?? fs.readFileSync(path.join(root, '.env'), 'utf8').match(/^OPENAI_API_KEY=["']?([^"'\s]+)/m)?.[1];
fs.mkdirSync(dir, {recursive: true});

async function speak(text, file) {
  const response = await fetch('https://api.openai.com/v1/audio/speech', {method: 'POST', headers: {Authorization: 'Bearer ' + key, 'Content-Type': 'application/json'},
    body: JSON.stringify({model: VOICE.model, voice: VOICE.voice, instructions: VOICE.instructions, input: text, response_format: 'wav'})});
  if (!response.ok) throw new Error(`${response.status} ${(await response.text()).slice(0, 300)}`);
  fs.writeFileSync(file, Buffer.from(await response.arrayBuffer()));
}
const seconds = file => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString());
// Silence the model leaves at either end is trimmed, so `at` and `pause` mean what they say.
const TRIM = 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse';

const lengths = fs.existsSync(path.join(root, 'stage', 'voice.json')) ? JSON.parse(fs.readFileSync(path.join(root, 'stage', 'voice.json'))) : {};
for (const [id, line] of Object.entries(lines)) {
  const file = path.join(dir, id + '.m4a');
  if (!measureOnly && (!only.length || only.includes(id))) {
    // A line with a pause is spoken sentence by sentence and joined with that much silence.
    const parts = line.pause ? line.text.match(/[^.?!]+[.?!]/g).map(s => s.trim()) : [line.text];
    const raws = [];
    for (const [i, part] of parts.entries()) { const raw = path.join(dir, `${id}.${i}.wav`); await speak(part, raw); raws.push(raw); }
    const inputs = raws.flatMap(raw => ['-i', raw]);
    const graph = raws.map((_, i) => `[${i}:a]aresample=44100,${TRIM}${i < raws.length - 1 ? `,apad=pad_dur=${line.pause}` : ''}[a${i}]`).join(';') + ';' + raws.map((_, i) => `[a${i}]`).join('') + `concat=n=${raws.length}:v=0:a=1,atempo=${VOICE.tempo ?? 1},loudnorm=I=-17:TP=-2:LRA=7[out]`;
    // Even loudness across lines, so the music bed can sit at one level under all of them.
    execFileSync('ffmpeg', ['-v', 'error', '-y', ...inputs, '-filter_complex', graph, '-map', '[out]', '-ar', '44100', '-ac', '1', '-c:a', 'aac', '-b:a', '128k', file]);
    raws.forEach(raw => fs.rmSync(raw));
  }
  lengths[id] = Math.round(seconds(file) * 100) / 100;
}
fs.writeFileSync(path.join(root, 'stage', 'voice.json'), JSON.stringify(lengths, null, 2) + '\n');
const total = Object.values(lengths).reduce((a, b) => a + b, 0);
console.log(`${Object.keys(lengths).length} lines, ${total.toFixed(1)}s of speech`);
