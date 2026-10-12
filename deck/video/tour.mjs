// Draws the GrowthIQ 2.0 video and plays its sound. The picture is a function of time alone:
// draw(seconds) sets every element for that moment, so the video can be played live against
// the audio clock, or exported frame by frame (window.seekTo, used by tools/export-video.mjs).
//   space: play from the start      ?t=12: open at 12 seconds
import {beats as plan, timeline, QUESTION, TAIL} from './shots.mjs';
import {compose, toWav, TAIL as RING} from '../../film/sound.mjs';
import {bed, MUSIC_LEVEL, VOICE_LEVEL} from '../../stage/soundtrack.mjs';

const voice = await (await fetch('voice.json')).json();
const beats = timeline(voice), total = beats.at(-1).start + beats.at(-1).duration;
const root = document.getElementById('tour'), IMAGES = '../assets/video/';
const clamp = v => Math.max(0, Math.min(1, v)), span = (t, from, to) => clamp((t - from) / (to - from));
const out = t => 1 - (1 - t) ** 3, inOut = t => t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
const el = (tag, className, parent, html) => { const node = document.createElement(tag); node.className = className; if (html) node.innerHTML = html; parent.append(node); return node; };

// A product screen: the image, a veil that dims it, and the regions that lift off it.
function card(parent, screen, [w, h], box, panels = []) {
  const scale = Math.min(box.width / w, box.height / h), width = w * scale, height = h * scale;
  const node = el('div', 'card', parent);
  Object.assign(node.style, {left: box.left + (box.width - width) / 2 + 'px', top: box.top + (box.height - height) / 2 + 'px', width: width + 'px', height: height + 'px'});
  el('img', '', node).src = `${IMAGES}${screen}.jpg`;
  const dim = el('div', 'dim', node);
  const lifted = panels.map(({rect: [x, y, pw, ph], at}) => {
    const panel = el('div', 'panel', node);
    Object.assign(panel.style, {left: x * scale + 'px', top: y * scale + 'px', width: pw * scale + 'px', height: ph * scale + 'px', backgroundImage: `url(${IMAGES}${screen}.jpg)`, backgroundSize: `${width}px ${height}px`, backgroundPosition: `${-x * scale}px ${-y * scale}px`});
    return {panel, at};
  });
  return {node, dim, lifted};
}
const STAGE = {left: 210, top: 150, width: 1500, height: 770};

const scenes = beats.map(beat => {
  const node = el('section', 'beat', root), scene = {beat, node};
  if (beat.label) scene.label = el('p', 'label', node, beat.label);
  if (beat.kind === 'title') scene.words = [...el('h1', 'title', node, beat.words.split(' ').map(word => `<span>${word}</span>`).join(' ')).children];
  else if (beat.kind === 'question') scene.typed = el('p', 'typed', node);
  else if (beat.kind === 'trio') scene.cards = beat.screens.map(([screen, name], i) => {
    const made = card(node, screen, [1100, 826], {left: 120 + i * 570, top: 240, width: 540, height: 406});
    const tag = el('p', 'tag', node, name); Object.assign(tag.style, {left: 120 + i * 570 + 'px', top: '676px'});
    return {...made, tag};
  });
  else if (beat.kind === 'close') {
    node.insertAdjacentHTML('beforeend', '<svg class="line" viewBox="0 0 1920 1080"><path pathLength="1" d="M-20 318 L 760 318"/><circle cx="760" cy="318" r="11"/></svg>');
    scene.path = node.querySelector('path'); scene.dot = node.querySelector('circle');
    scene.tagline = el('h1', 'title', node, 'We see growth<br><em>before it happens.</em>'); scene.tagline.style.top = '390px'; scene.tagline.style.fontSize = '152px';
    scene.sign = el('p', 'sign', node, 'GrowthIQ 2.0');
  } else {
    scene.main = card(node, beat.screen, beat.size, STAGE, beat.panels);
    if (beat.over) { scene.over = card(node, beat.over.screen, [556, 552], {left: 1250, top: 330, width: 520, height: 516}); scene.overTag = el('p', 'label', node, beat.over.label); Object.assign(scene.overTag.style, {left: '1250px', top: '268px'}); }
  }
  scene.caption = el('p', 'caption', node, `<span>${beat.text}</span>`);
  return scene;
});

// A card arriving, drifting forward while it is on screen, and leaving.
function place(node, u, duration, delay = 0) {
  const arrive = out(span(u, delay, delay + 1.1)), leave = inOut(span(u, duration, duration + 0.55));
  node.style.opacity = arrive * (1 - leave);
  node.style.transform = `translateY(${(1 - arrive) * 80 - leave * 30}px) rotateX(${(1 - arrive) * 9}deg) scale(${0.93 + 0.07 * arrive + 0.025 * clamp(u / duration) + 0.02 * leave})`;
}
// Panels lift one at a time: each settles back as the next one rises.
function lift({dim, lifted}, u) {
  let most = 0;
  lifted.forEach(({panel, at}, i) => {
    const until = lifted[i + 1] ? lifted[i + 1].at - 0.15 : 1e6;
    const up = out(span(u, at, at + 0.8)) * (1 - inOut(span(u, until, until + 0.5)));
    most = Math.max(most, up);
    panel.style.opacity = up > 0 ? 1 : 0;
    panel.style.transform = `translateY(${-10 * up}px) scale(${1 + 0.085 * up})`;
    panel.style.boxShadow = `0 ${30 * up}px ${90 * up}px rgb(0 0 0 / ${0.5 * up}), 0 0 0 1px rgb(13 23 48 / ${0.12 * up})`;
  });
  dim.style.opacity = 0.36 * most;
}

function draw(seconds) {
  const t = Math.max(0, Math.min(total + TAIL, seconds));
  for (const scene of scenes) {
    const {beat, node} = scene, u = t - beat.start, last = beat === beats.at(-1);
    const on = u >= 0 && (last || u < beat.duration + 0.6);
    node.style.visibility = on ? 'visible' : 'hidden';
    if (!on) continue;
    const leave = last ? 0 : inOut(span(u, beat.duration, beat.duration + 0.55));
    node.style.opacity = 1;
    if (scene.label) scene.label.style.opacity = out(span(u, 0.2, 1)) * (1 - leave);
    scene.caption.style.opacity = span(u, beat.voiceAt - 0.25, beat.voiceAt + 0.15) * (1 - span(u, beat.voiceAt + beat.voice + 0.5, beat.voiceAt + beat.voice + 0.9)) * (1 - leave);
    if (scene.words) scene.words.forEach((word, i) => { const shown = out(span(u, 0.7 + i * 0.13, 1.6 + i * 0.13)); word.style.opacity = shown * (1 - leave); word.style.transform = `translateY(${(1 - shown) * 34 - leave * 20}px)`; });
    if (scene.typed) {
      const typed = QUESTION.slice(0, Math.floor(span(u, 0.9, 5.6) * QUESTION.length));
      scene.typed.innerHTML = `${typed}<i style="opacity:${Math.floor(u * 2) % 2 ? 0.25 : 1}"></i>`;
      scene.typed.style.opacity = out(span(u, 0.3, 1)) * (1 - leave);
      scene.typed.style.transform = `translateY(${-leave * 30}px)`;
    }
    if (scene.cards) scene.cards.forEach((made, i) => { place(made.node, u, beat.duration, 0.2 + i * 0.4); made.tag.style.opacity = out(span(u, 0.9 + i * 0.4, 1.7 + i * 0.4)) * (1 - leave); });
    if (scene.main) { place(scene.main.node, u, beat.duration); lift(scene.main, u); }
    if (scene.over) { place(scene.over.node, u, beat.duration, beat.over.at); scene.overTag.style.opacity = out(span(u, beat.over.at + 0.5, beat.over.at + 1.2)) * (1 - leave); }
    if (scene.path) {
      scene.path.style.strokeDashoffset = 1 - inOut(span(u, 0.3, 1.9));
      const landed = out(span(u, 1.8, 2.5)); scene.dot.style.opacity = landed; scene.dot.setAttribute('r', 11 * landed);
      const shown = out(span(u, 0.9, 2.2)); scene.tagline.style.opacity = shown; scene.tagline.style.transform = `translateY(${(1 - shown) * 30}px)`;
      scene.sign.style.opacity = out(span(u, 2.6, 3.6));
    }
  }
}

// Sound: one voice file per beat over the generated bed.
const at = id => beats.find(beat => beat.id === id).start;
const score = () => bed({end: total, pulseFrom: at('ask'), drumsFrom: at('answer'), close: at('close') + 1.2, motifs: [0.5, at('answer') + 0.6]});
let files;
const loadVoices = () => files ??= Promise.all(beats.map(async beat => [beat.id, await (await fetch(`voice/${beat.id}.m4a`)).arrayBuffer()]));
async function schedule(ctx, start) {
  const speech = ctx.createGain(); speech.gain.value = VOICE_LEVEL; speech.connect(ctx.destination);
  for (const [id, bytes] of await loadVoices()) {
    const beat = beats.find(b => b.id === id), source = ctx.createBufferSource();
    source.buffer = await ctx.decodeAudioData(bytes.slice(0)); source.connect(speech); source.start(start + beat.start + beat.voiceAt);
  }
  compose(ctx, ctx.destination, start, score(), MUSIC_LEVEL);
}
window.renderScore = async () => {
  const ctx = new OfflineAudioContext(2, Math.ceil((total + RING) * 44100), 44100);
  await schedule(ctx, 0);
  const bytes = new Uint8Array(await toWav(await ctx.startRendering()).arrayBuffer());
  let text = ''; for (let i = 0; i < bytes.length; i += 32768) text += String.fromCharCode(...bytes.subarray(i, i + 32768));
  return btoa(text);
};
window.seekTo = draw;
window.totalSeconds = total + TAIL;

const fit = () => document.documentElement.style.setProperty('--fit', Math.min(innerWidth / 1920, innerHeight / 1080));
addEventListener('resize', fit); fit();
await Promise.all([document.fonts.load('16px "Source Sans 3"'), document.fonts.load('16px "Source Serif 4"'), ...[...root.querySelectorAll('img')].map(img => img.decode().catch(() => {}))]);
const params = new URLSearchParams(location.search), hint = document.getElementById('start');
draw(Number(params.get('t') || 0));
if (params.has('t')) hint.remove();

let playing;
addEventListener('keydown', async event => {
  if (event.key !== ' ' && event.key !== 'Enter') return;
  event.preventDefault(); hint.remove();
  playing?.close();
  const ctx = playing = new AudioContext(), start = ctx.currentTime + 0.4;
  await schedule(ctx, start);
  const frame = () => { if (playing !== ctx) return; draw(ctx.currentTime - start); requestAnimationFrame(frame); };
  frame();
});
