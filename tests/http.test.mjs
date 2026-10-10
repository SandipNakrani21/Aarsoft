import test from 'node:test';
import assert from 'node:assert/strict';
const base = process.env.TEST_BASE_URL || 'http://localhost:3004';

test('every sitemap content route is available with one H1', async () => {
  const sitemap = await fetch(base + '/sitemap.xml').then(r => r.text());
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
  assert.equal(urls.length, 32);
  for (const pathname of urls) {
    const response = await fetch(base + pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, pathname);
  }
});
test('headers, JSON-LD, share image and invalid route', async () => {
  const response = await fetch(base);
  assert.match(response.headers.get('content-security-policy') || '', /object-src 'none'/);
  assert.match(response.headers.get('permissions-policy') || '', /camera=\(\)/);
  const html = await response.text();
  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(script[1]);
  const image = await fetch(base + '/api/og?title=Audit%20share%20preview');
  assert.equal(image.status, 200);
  assert.match(image.headers.get('content-type') || '', /image\/png/);
  assert.equal((await fetch(base + '/services/audit-nonexistent')).status, 404);
});
