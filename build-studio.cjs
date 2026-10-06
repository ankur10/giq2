const esbuild = require('esbuild');
const fs = require('node:fs');
const path = require('node:path');
const outdir = path.join(__dirname, 'assets/studio');
fs.mkdirSync(outdir, {recursive: true});
// This directory contains only this build's generated React/Three.js assets.
for (const file of fs.readdirSync(outdir)) {
  if (/^(studio-spatial|growthiq-demo|ask-results|chunk-[A-Z0-9]+)\.js(\.LEGAL\.txt)?$/.test(file)) fs.unlinkSync(path.join(outdir, file));
}
esbuild.buildSync({entryPoints:['studio-spatial.jsx','growthiq-demo.jsx','ask-results.jsx'],bundle:true,minify:true,format:'esm',splitting:true,outdir,entryNames:'[name]',chunkNames:'chunk-[hash]',define:{'process.env.NODE_ENV':'"production"'},legalComments:'linked',logLevel:'info'});
