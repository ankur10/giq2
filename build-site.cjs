const fs = require('node:fs');
const path = require('node:path');

const output = path.join(__dirname, 'dist');
// Publish only runtime files, keeping source, local reviews and tooling private.
const files = [
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
console.log('Static site built in dist/');
