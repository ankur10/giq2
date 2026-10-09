// Lays evenly spaced frames of a video out on one image, to review an export at a glance.
//   node tools/contact-sheet.mjs <video> <out.jpg> [frames=16] [columns=4]
import {execFileSync} from 'node:child_process';
const [video, out, frames = 16, columns = 4] = process.argv.slice(2);
if (!out) { console.error('usage: node tools/contact-sheet.mjs <video> <out.jpg> [frames] [columns]'); process.exit(1); }
const seconds = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', video]).toString());
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', video, '-vf', `fps=${frames}/${seconds},scale=640:-1,tile=${columns}x${Math.ceil(frames / columns)}`, '-frames:v', '1', '-update', '1', out], {stdio: 'inherit'});
console.log(`wrote ${out}: ${frames} frames, one every ${(seconds / frames).toFixed(1)}s`);
