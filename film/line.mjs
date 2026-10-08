// The line and the camera as pure functions of the beat. The line is always one polyline of N
// points; what changes from section to section is the rule that places them.
import {CatmullRomCurve3, Vector3} from 'three';
import {span, inOut, out, mix, clamp, stops, climb} from './score.mjs';

export const N = 360;
export const ORANGE = [0.91, 0.44, 0.1], PALE = [0.62, 0.7, 0.82];
const XS = 2, SPIKE = 5;

// --- The run: a curve through the chain, the stations and the climb -------------------------
const route = [[XS, SPIKE, 0], [11, 3.2, -10], [20, 6, -22], [29, 2.5, -34], [38, 4.5, -46], [45, 4, -52], [51, 4.6, -56], [57, 4, -60], [63, 4.6, -64], [69, 4, -68], [76, 7, -72], [82, 14, -75], [86, 24, -77]];
const curve = new CatmullRomCurve3(route.map(p => new Vector3(...p)), false, 'catmullrom', 0.5);
// Beat at which the head reaches each route point: it launches at 48 and arrives on the beat.
const arrivals = [48, ...stops.map(s => s.at), ...climb];
export const stopPoints = route.slice(1, 1 + stops.length);
export const END = route.at(-1);
const scratch = new Vector3();
const routePoint = u => { curve.getPoint(clamp(u), scratch); return [scratch.x, scratch.y, scratch.z]; };
// How far along the route the head is, as a fraction; it eases between stops so it lands on each.
export function headOnRoute(b) {
  if (b <= arrivals[0]) return 0;
  for (let i = 1; i < arrivals.length; i++) if (b < arrivals[i]) return (i - 1 + inOut(span(b, arrivals[i - 1], arrivals[i]))) / (route.length - 1);
  return 1;
}

// --- Screen plane: from the end of the run, the line lives on a plane facing the camera -------
// Positions are in screen heights from the centre (x right, y up).
export const CAMERA_DISTANCE = 12, FOV = 35;
const K = 2 * CAMERA_DISTANCE * Math.tan(FOV * Math.PI / 360);
const onPlane = (x, y) => [END[0] + x * K, END[1] + y * K, END[2]];
export const pageRects = [-0.42, 0, 0.42].map(x => ({x: x - 0.15, y: -0.17, w: 0.3, h: 0.4}));
export const frameRect = {x: -0.58, y: -0.31, w: 1.16, h: 0.66};
const FLAT_Y = -0.16, FLAT_HALF = 1.4;
const corners = r => [[r.x, r.y], [r.x, r.y + r.h], [r.x + r.w, r.y + r.h], [r.x + r.w, r.y], [r.x, r.y]];
export const defaultAnchors = {caret: {x: 0.1, y: 0}, underline: {x: -0.3, y: -0.07, w: 0.6}};

// Evenly spaced samples along a polyline between two distances measured along it.
function along(vertices, from, to, count = N) {
  const lengths = [0];
  for (let i = 1; i < vertices.length; i++) lengths.push(lengths[i - 1] + Math.hypot(vertices[i][0] - vertices[i - 1][0], vertices[i][1] - vertices[i - 1][1]));
  const points = [];
  let segment = 1;
  for (let i = 0; i < count; i++) {
    const d = mix(from, to, i / (count - 1));
    while (segment < vertices.length - 1 && lengths[segment] < d) segment++;
    while (segment > 1 && lengths[segment - 1] > d) segment--;
    const t = lengths[segment] === lengths[segment - 1] ? 0 : clamp((d - lengths[segment - 1]) / (lengths[segment] - lengths[segment - 1]));
    points.push([mix(vertices[segment - 1][0], vertices[segment][0], t), mix(vertices[segment - 1][1], vertices[segment][1], t)]);
  }
  return points;
}
const lengthTo = (vertices, index) => { let d = 0; for (let i = 1; i <= index; i++) d += Math.hypot(vertices[i][0] - vertices[i - 1][0], vertices[i][1] - vertices[i - 1][1]); return d; };
// A value that eases between keyframes [[beat, value], ...].
const keyed = (b, keys) => { if (b <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) if (b < keys[i][0]) return mix(keys[i - 1][1], keys[i][1], inOut(span(b, keys[i - 1][0], keys[i][0]))); return keys.at(-1)[1]; };

// --- The trace: the line as a signal across the screen (sections 1 to 3) ----------------------
const pulse = (x, centre) => { const d = x - centre; return Math.exp(-((d / 0.35) ** 2)) - 0.45 * Math.exp(-(((d - 0.55) / 0.3) ** 2)) - 0.3 * Math.exp(-(((d + 0.5) / 0.3) ** 2)); };
export const jitter = (x, b, seed = 0) => Math.sin(x * 1.7 + b * 1.9 + seed) * 0.5 + Math.sin(x * 4.3 - b * 3.1 + 1.3 + seed * 2.1) * 0.3 + Math.sin(x * 9.1 + b * 5.2 + 4 + seed * 3.7) * 0.2;
function traceY(x, b) {
  const beat = 0.6 * span(b, 1.5, 2.2) * (1 - span(b, 6.8, 7.5)) * pulse(x, mix(-8, 8, span(b, 1.5, 7.5)));
  const noise = 0.32 * span(b, 10, 20) * (1 - span(b, 31.6, 32)) * jitter(x, b);
  const spike = b < 32 ? 0 : SPIKE * (1 - Math.exp(-1.6 * (b - 32)) * Math.cos(2.4 * (b - 32))) * Math.exp(-(((x - XS) / 0.5) ** 2));
  return beat + noise + spike;
}

// --- The line ------------------------------------------------------------------------------
export function hero(b, anchors = defaultAnchors) {
  const positions = new Float32Array(N * 3);
  const put = (i, p) => { positions[i * 3] = p[0]; positions[i * 3 + 1] = p[1]; positions[i * 3 + 2] = p[2]; };
  let color = ORANGE, opacity = 1, dot = b >= 32, head = null;

  if (b < 48) {
    // A trace across the screen. After the spike it gathers in to its peak.
    // Points are spread evenly while the pulse crosses the screen, then crowd towards the
    // peak once the camera has pulled back, so both shapes stay smooth.
    const half = mix(13, 60, span(b, 8, 14)) * (1 - inOut(span(b, 44, 48))), crowd = mix(1, 2.2, span(b, 14, 30));
    for (let i = 0; i < N; i++) { const v = i / (N - 1) * 2 - 1, x = XS + Math.sign(v) * Math.abs(v) ** crowd * half; put(i, [x, traceY(x, b), 0]); }
    if (b < 32) { const fade = span(b, 14, 22); color = ORANGE.map((c, i) => mix(c, PALE[i], fade)); opacity = mix(1, 0.55, fade); }
    opacity *= span(b, 0, 1.2);
    // The eye follows the peak; the run starts from it.
    head = [XS, traceY(XS, b), 0];
  } else if (b < 92) {
    // Travelling along the route; at the end the trail gathers in to the head.
    const head = headOnRoute(b), tail = head * inOut(span(b, 88, 92));
    for (let i = 0; i < N; i++) put(i, routePoint(mix(tail, head, i / (N - 1))));
  } else {
    const caret = anchors.caret, u = anchors.underline;
    let points;
    if (b < 108) {
      // A text cursor.
      const grow = out(span(b, 92, 94)), cx = mix(0, caret.x, grow), cy = mix(0, caret.y, grow), h = 0.036 * grow;
      points = along([[cx, cy - h], [cx, cy + h]], 0, 2 * h);
      const blinking = (b >= 94 && b < 96) || b >= 104;
      if (blinking && b % 1 >= 0.5) opacity = 0;
      dot = b < 93;
    } else if (b < 120) {
      // The cursor lies down and becomes the underline of the answer.
      const q = out(span(b, 108, 109)), p = inOut(span(b, 108.5, 111.5)), h = 0.036;
      const from = [mix(caret.x, u.x, q), mix(caret.y - h, u.y, q)], to = [mix(caret.x, u.x + u.w * p, q), mix(caret.y + h, u.y, q)];
      points = along([from, to], 0, Math.hypot(to[0] - from[0], to[1] - from[1]));
      dot = false;
    } else if (b < 134) {
      // One stroke: off the underline, round each page in turn.
      const path = [[u.x, u.y], [u.x + u.w, u.y], ...pageRects.flatMap(corners)];
      const at = i => lengthTo(path, i), corner = n => 2 + n * 5;   // index of page n's first corner
      const head = keyed(b, [[120, at(1)], [121, at(corner(0))], [124, at(corner(0) + 4)], [125, at(corner(1))], [128, at(corner(1) + 4)], [129, at(corner(2))], [132, at(corner(2) + 4)]]);
      const tail = keyed(b, [[120, 0], [121, at(corner(0))], [124, at(corner(0))], [125, at(corner(1))], [128, at(corner(1))], [129, at(corner(2))], [132, at(corner(2))], [134, at(corner(2) + 4)]]);
      points = along(path, tail, head);
    } else if (b < 144) {
      // Gathered to a point, it crosses to where the frame will start.
      const t = inOut(span(b, 138, 144)), last = pageRects[2];
      const p = [mix(last.x, frameRect.x, t), mix(last.y, frameRect.y, t)];
      points = along([p, p], 0, 0);
    } else {
      // Draws the frame, holds it, then unfolds into one flat line.
      const frame = corners(frameRect), total = lengthTo(frame, 4);
      const drawn = along(frame, 0, total * inOut(span(b, 144, 148)));
      const unfold = inOut(span(b, 152, 156)), beat = 0.05 * span(b, 156, 156.6) * (1 - span(b, 158.4, 159)) / 0.6;
      points = drawn.map((p, i) => {
        const x = mix(-FLAT_HALF, FLAT_HALF, i / (N - 1));
        return [mix(p[0], x, unfold), mix(p[1], FLAT_Y + beat * pulse(x * 8, mix(-6, 6, span(b, 156, 159))), unfold)];
      });
      dot = b < 152;
      opacity = 1 - span(b, 159, 160);
    }
    points.forEach((p, i) => put(i, onPlane(p[0], p[1])));
  }
  return {positions, color, opacity, dot, head: head ?? [positions[(N - 1) * 3], positions[(N - 1) * 3 + 1], positions[(N - 1) * 3 + 2]]};
}

// --- The camera ----------------------------------------------------------------------------
const blend = (a, b, t) => ({position: a.position.map((v, i) => mix(v, b.position[i], t)), look: a.look.map((v, i) => mix(v, b.look[i], t))});
export function camera(b) {
  const wide = {position: [0, 0, mix(9, 34, inOut(span(b, 8, 26)))], look: [0, 0, 0]};
  const close = {position: [XS + 1.6, 2.2, 16], look: [XS + 0.4, 2.1, 0]};
  // Riding the line: just behind and to one side of where the head was a moment ago.
  const h = routePoint(headOnRoute(b - 1.2)), ahead = routePoint(headOnRoute(b - 0.2));
  const riding = {position: [h[0] - 4.5, h[1] + 2.4, h[2] + 10.5], look: [ahead[0] + 1.2, ahead[1] + 0.2, ahead[2] - 1]};
  const facing = {position: [END[0], END[1], END[2] + CAMERA_DISTANCE], look: END};
  if (b < 46) return blend(wide, close, inOut(span(b, 32, 40)));
  if (b < 84) return blend(close, riding, inOut(span(b, 46, 52)));
  return blend(riding, facing, inOut(span(b, 84, 92)));
}
