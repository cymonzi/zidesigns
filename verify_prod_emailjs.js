const https = require('https');
const base = 'https://zidesigns.vercel.app';
const pageUrl = `${base}/start-project`;
const keywords = ['template_y5ipuvd', 'api.emailjs.com', 'service_1ral4jg'];

function getPage(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

(async () => {
  try {
    const html = await getPage(pageUrl);
    const scripts = Array.from(html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)).map((m) => m[1]);
    console.log(`Found ${scripts.length} script(s)`);
    let found = false;
    for (const script of scripts) {
      const url = script.startsWith('http') ? script : base + script;
      try {
        const text = await getPage(url);
        const hits = keywords.filter((k) => text.includes(k));
        if (hits.length) {
          found = true;
          console.log(`MATCH in ${url}`);
          hits.forEach((hit) => console.log(`  ${hit}`));
        }
      } catch (err) {
        console.error(`ERROR fetching ${url}: ${err.message}`);
      }
    }
    if (!found) {
      console.log('No matching EmailJS strings found in deployed bundles.');
      process.exit(1);
    } else {
      console.log('Verified EmailJS strings in deployed bundles.');
    }
  } catch (err) {
    console.error('Failed to fetch production page:', err.message);
    process.exit(1);
  }
})();
