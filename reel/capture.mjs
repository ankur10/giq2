// Captures the reel's product screens from the deployed app and records where each named
// region sits on its capture, with the background colour behind it.
//
// Not part of the build. It needs Chrome and puppeteer-core, which this repo does not depend on:
//   npm install --no-save puppeteer-core && node reel/capture.mjs [site] [out-dir]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const site = process.argv[2] || 'https://giq2.ankurj.com/';
const out = process.argv[3] || path.join(import.meta.dirname, '..', 'assets', 'reel');
const SIZE = {width: 1440, height: 900, deviceScaleFactor: 2};
// [file, path on the site, regions as {name: selector}, optional {click, scroll} selectors]
const screens = [
  ['radar', '#radar', {mail: '.tracker-mail-window', body: '.tracker-email-body'}],
  ['briefing', '#home', {reader: '.signal-reader', index: '.signal-index'}],
  ['signals', '#signals', {reader: '.signal-reader'}],
  ['markets', '#markets', {inspector: '.market-inspector', table: '.table-panel'}],
  ['ecosystem', '#ecosystem', {ecosystem: '.ecosystem'}],
  ['competitors', '#competitors', {presence: '.table-panel'}],
  ['my-competitors', '#my-competitors', {table: '.table-panel'}],
  ['benchmark', '#benchmark', {chart: '.table-panel'}, {click: '[data-chart="chart"]', scroll: '.benchmark-modes'}],
  ['ask', '#ask', {composer: '.composer'}],
  ['answer', 'ask-results.html', {answer: '.ar-answer-grid article', workspace: '.ar-workspace'}],
  ['expert', '#domain-expert', {form: '.expert-form-panel'}],
  ['customers', '#customers', {access: '.access-layout'}],
  ['studio', '#studio', {starts: '.studio-starts'}],
  ['brief', '#studio/market-model', {deliverable: '.studio-deliverable', brief: '.studio-brief-panel'}],
];

const browser = await puppeteer.launch({executablePath: process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--hide-scrollbars']});
const page = await browser.newPage();
await page.setViewport(SIZE);
const manifest = {};
for (const [file, route, regions, before = {}] of screens) {
  await page.goto(new URL(route, site).href, {waitUntil: 'networkidle0'});
  await page.evaluate(() => document.fonts.ready);
  if (before.click) await page.click(before.click);
  // Bring a region that starts low on the page up into the capture.
  if (before.scroll) await page.evaluate(selector => scrollTo(0, document.querySelector(selector).getBoundingClientRect().top + scrollY - 96), before.scroll);
  await new Promise(resolve => setTimeout(resolve, 1200));
  manifest[file] = await page.evaluate(regions => Object.fromEntries(Object.entries(regions).flatMap(([name, selector]) => {
    const el = document.querySelector(selector); if (!el) return [];
    const r = el.getBoundingClientRect(), top = Math.max(0, r.top), bottom = Math.min(innerHeight, r.bottom);
    if (!r.width || bottom - top < 40) return [];
    // The colour actually showing behind the region: the nearest ancestor that paints one.
    let bg = 'rgb(255, 255, 255)';
    for (let node = el; node; node = node.parentElement) { const c = getComputedStyle(node).backgroundColor; if (c && !/rgba\(.*, 0\)$|transparent/.test(c)) { bg = c; break; } }
    const round = v => Math.round(v * 10000) / 10000;
    return [[name, {rect: [round(Math.max(0, r.left) / innerWidth), round(top / innerHeight), round((Math.min(innerWidth, r.right) - Math.max(0, r.left)) / innerWidth), round((bottom - top) / innerHeight)], bg}]];
  })), regions);
  await page.screenshot({path: path.join(out, file + '.png')});
  console.log(file, Object.keys(manifest[file]).join(', ') || 'NO REGIONS');
}
await browser.close();
fs.writeFileSync(path.join(import.meta.dirname, 'regions.json'), JSON.stringify(manifest, null, 2) + '\n');
