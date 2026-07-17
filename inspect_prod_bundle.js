const https = require('https');
const base = 'https://zidesigns.vercel.app';
const pageUrl = `${base}/start-project`;
const patterns = ['isPhase2Valid', 'goal.trim', 'Continue →', 'disabled=""', 'setPhase(3)', 'setBudget', 'setTimeline', 'setGoal'];
function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}
(async () => {
  const html = await fetchText(pageUrl);
  const scripts = Array.from(html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)).map(m => m[1]);
  console.log('Found', scripts.length, 'scripts');
  for (const script of scripts) {
    const url = script.startsWith('http') ? script : base + script;
    const text = await fetchText(url);
    const hits = patterns.filter(p => text.includes(p));
    if (hits.length > 0) {
      console.log('SCRIPT:', url);
      console.log('  hits:', hits);
      for (const p of hits) {
        const idx = text.indexOf(p);
        const snippet = text.slice(Math.max(0, idx - 80), Math.min(text.length, idx + 120));
        console.log('   ', p, '=>', snippet.replace(/\s+/g, ' ').slice(0, 200));
      }
    }
  }
})();
