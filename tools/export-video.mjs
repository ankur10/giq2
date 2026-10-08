// Exports the film or the reel as an mp4 with its score, frame by frame, so picture and sound
// are exact. Not part of the build: it needs Chrome, ffmpeg and puppeteer-core.
//   npm install --no-save puppeteer-core
//   node tools/export-video.mjs <film|reel> <from-second> <to-second> <out.mp4> [site]
// A long piece can be exported as several ranges at once and joined afterwards; each range
// first steps silently through the two seconds before it, so anything mid-transition at its
// first frame is in the right state.
import puppeteer from 'puppeteer-core';
import {spawn} from 'node:child_process';
import fs from 'node:fs';

const [piece, from, to, out, site = 'http://127.0.0.1:8772/'] = process.argv.slice(2);
const FPS = 30, PREROLL = 2, seconds = Number(to), start = Number(from), lead = Math.min(start, PREROLL);
const browser = await puppeteer.launch({executablePath: process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', protocolTimeout: 600000, args: ['--enable-gpu', '--ignore-gpu-blocklist', '--use-angle=metal', '--hide-scrollbars']});
const page = await browser.newPage();
await page.setViewport({width: 1920, height: 1080, deviceScaleFactor: 1});
const errors = []; page.on('pageerror', e => errors.push(String(e)));
await page.goto(new URL(`${piece}?t=${start - lead}`, site).href, {waitUntil: 'networkidle0'});
await new Promise(resolve => setTimeout(resolve, 1500));

const wav = out.replace(/\.mp4$/, '.wav');
fs.writeFileSync(wav, Buffer.from(await page.evaluate(() => window.renderScore()), 'base64'));
const ffmpeg = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-ss', String(start), '-i', wav,
  '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-c:a', 'aac', '-b:a', '192k', '-t', String(seconds - start), '-movflags', '+faststart', out], {stdio: ['pipe', 'inherit', 'inherit']});
const frames = Math.round((seconds - start) * FPS);
for (let i = -Math.round(lead * FPS); i < frames; i++) {
  await page.evaluate(t => window.seekTo(t), start + i / FPS);
  if (i < 0) continue;
  const shot = await page.screenshot({type: 'jpeg', quality: 93, optimizeForSpeed: true});
  if (!ffmpeg.stdin.write(shot)) await new Promise(resolve => ffmpeg.stdin.once('drain', resolve));
  if (i % 300 === 0) console.log(`${piece}: frame ${i} of ${frames}`);
}
ffmpeg.stdin.end();
await new Promise(resolve => ffmpeg.on('close', resolve));
await browser.close();
fs.rmSync(wav);
console.log(errors.length ? 'page errors: ' + errors.join(' | ') : `${piece}: wrote ${out}`);
