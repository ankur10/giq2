const fs = require('node:fs');
const path = require('node:path');

const output = path.join(__dirname, 'dist');
// Publish only runtime files, keeping source, local reviews and tooling private.
const files = [
  'innovation.html', 'innovation-guided.html', 'innovation-discovery.css', 'innovation-connected.html', 'innovation-investigation.css', 'innovation-classic.html', 'innovation.css', 'innovation-brief.css',
  'connected-markets.js', 'connected-markets.html', 'connected-markets.css',
  'integrations.js', 'integrations.css',
  'my-work.js', 'my-work.css', 'my-feed.js', 'my-feed.css',
  'stage.html', 'stage.css', 'film.html', 'film.css', 'reel.html', 'reel.css', 'tracker.js', 'tracker.css', 'domain-expert.js', 'domain-expert.css', 'ask-results.html', 'ask-results.css', 'ask-thermo.css', 'index.html', 'app.js', 'data.js', 'studio-data.js', 'theme.js',
  'styles.css', 'themes.css', 'refinements.css', 'studio-next.css',
  'studio-variants.css', 'growthiq-demo.css', 'keynote.css',
];
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const file of files) {
  fs.copyFileSync(path.join(__dirname, file), path.join(output, file));
}
fs.cpSync(path.join(__dirname, 'assets'), path.join(output, 'assets'), { recursive: true });
// The GrowthIQ 2.0 deck is published as it stands, without the source of its video.
const deckOnly = source => !/deck\/(video|assets\/video|README\.md|vercel\.json|\.vercelignore|assets\/demo-old\.mp4)(\/|$)/.test(source);
fs.cpSync(path.join(__dirname, 'deck'), path.join(output, 'deck'), { recursive: true, filter: deckOnly });
fs.mkdirSync(path.join(output, 'data'), { recursive: true });
fs.copyFileSync(path.join(__dirname, 'data/data1.json'), path.join(output, 'data/data1.json'));
console.log('Static site built in dist/');
