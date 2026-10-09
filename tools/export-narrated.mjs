// Exports the narrated stage demo as an mp4 with its voice-over and music.
//   node tools/export-narrated.mjs <out.mp4> [--speed 1.5] [--site http://127.0.0.1:8772/]
// The demo's animations run on real timers, so unlike the film and reel it cannot be stepped
// frame by frame. It is recorded live instead, and two corner markers the page flashes (one
// second in, and one second from the end) say where the demo starts in the recording and how
// fast the recording really ran. With --speed the picture is then quickened step by step, each
// step as far as its spoken line allows, and the soundtrack is rendered for those timings.
// Needs Chrome, ffmpeg and puppeteer-core; the site must be built and being served.
import puppeteer from 'puppeteer-core';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {steps} from '../stage/story.mjs';
import {narratedSteps, quickened, startTimes} from '../stage/narration.mjs';

const args = process.argv.slice(2), option = (name, fallback) => { const i = args.indexOf('--' + name); return i < 0 ? fallback : args.splice(i, 2)[1]; };
const speed = Number(option('speed', 1)), site = option('site', 'http://127.0.0.1:8772/'), out = args[0];
if (!out) { console.error('usage: node tools/export-narrated.mjs <out.mp4> [--speed 1.5] [--site url]'); process.exit(1); }

const voice = JSON.parse(fs.readFileSync(new URL('../stage/voice.json', import.meta.url)));
const script = narratedSteps(steps, voice), fast = quickened(script, speed), starts = startTimes(script);
const total = starts.at(-1) + script.at(-1).duration, TAIL = 2;
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'narrated-')), recording = path.join(work, 'recording.webm'), wav = path.join(work, 'score.wav');
const ffmpeg = (...list) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...list], {stdio: ['ignore', 'inherit', 'inherit']});

const browser = await puppeteer.launch({executablePath: process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', protocolTimeout: 600000, args: ['--enable-gpu', '--ignore-gpu-blocklist', '--use-angle=metal', '--hide-scrollbars']});
const page = await browser.newPage();
await page.setViewport({width: 1920, height: 1080, deviceScaleFactor: 1});
const errors = []; page.on('pageerror', e => errors.push(String(e)));

// 1. The soundtrack, rendered by the page itself for the timings this export will have.
await page.goto(new URL('stage?narrated&silent', site).href, {waitUntil: 'networkidle0'});
fs.writeFileSync(wav, Buffer.from(await page.evaluate(s => window.renderScore(s), speed), 'base64'));

// 2. The picture, recorded live at normal speed.
console.log(`recording ${Math.round(total)}s of picture...`);
await page.goto('about:blank');
const recorder = await page.screencast({path: recording});
await page.goto(new URL('stage?narrated&silent&sync', site).href, {waitUntil: 'networkidle0'});
await new Promise(resolve => setTimeout(resolve, (total + 6) * 1000));
await recorder.stop();
await browser.close();
if (errors.length) console.log('page errors: ' + errors.join(' | '));

// 3. Where the two magenta markers fall in the recording.
const stats = path.join(work, 'corner.txt');
ffmpeg('-i', recording, '-vf', `crop=8:8:0:0,signalstats,metadata=print:file=${stats}`, '-f', 'null', '-');
const hits = fs.readFileSync(stats, 'utf8').split('frame:').slice(1).filter(block => Number(block.match(/UAVG=([\d.]+)/)[1]) > 180 && Number(block.match(/VAVG=([\d.]+)/)[1]) > 190).map(block => Number(block.match(/pts_time:([\d.]+)/)[1]));
const first = hits[0], second = hits.find(t => t > first + 5);
if (first === undefined || second === undefined) { console.error(`could not find both sync markers; the recording is kept at ${recording}`); process.exit(1); }
const scale = (total - 2) / (second - first), origin = first - 1 / scale;   // demo seconds per recorded second; the demo's zero
console.log(`the recording ran at ${(100 / scale).toFixed(2)}% of real speed; the demo starts ${origin.toFixed(3)}s into it`);
if (Math.abs(scale - 1) > 0.02) console.log('warning: that is more than 2% off. The machine was probably busy; consider exporting again.');

// 4. Each step cut out and run at its own rate, the marker's corner painted over, sound laid under.
const at = seconds => (origin + seconds / scale).toFixed(4);
const parts = [...script.map((step, i) => [starts[i], starts[i] + step.duration, fast[i].rate]), [total, total + TAIL, 1]];
const graph = parts.map(([from, to, rate], i) => `[0:v]trim=start=${at(from)}:end=${at(to)},setpts=(PTS-STARTPTS)*${(scale / rate).toFixed(6)}[v${i}]`).join(';') + ';'
  + parts.map((_, i) => `[v${i}]`).join('') + `concat=n=${parts.length}:v=1:a=0,fps=30,split[m][c];[c]crop=12:12:12:0[p];[m][p]overlay=0:0[v]`;
ffmpeg('-i', recording, '-i', wav, '-filter_complex', graph, '-map', '[v]', '-map', '1:a', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '23', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out);
fs.rmSync(work, {recursive: true});
const length = fast.reduce((sum, step) => sum + step.duration, 0) + TAIL;
console.log(`wrote ${out}: ${Math.floor(length / 60)}:${String(Math.round(length % 60)).padStart(2, '0')}` + (speed === 1 ? '' : `, picture at ${fast.map(s => s.rate).reduce((a, b) => Math.min(a, b)).toFixed(2)}x to ${speed}x`));
