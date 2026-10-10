const productionUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : undefined);
const indexable = process.env.SITE_INDEXABLE === 'true' || (process.env.SITE_INDEXABLE !== 'false' && process.env.VERCEL_ENV === 'production');
if (indexable && !productionUrl) throw new Error('Set NEXT_PUBLIC_SITE_URL before enabling production indexing.');
const resolvedUrl = new URL(productionUrl || 'http://localhost:3000');
if (!['http:', 'https:'].includes(resolvedUrl.protocol) || resolvedUrl.username || resolvedUrl.password) throw new Error('SITE_URL must be a public HTTP(S) URL.');
if (indexable && (resolvedUrl.protocol !== 'https:' || ['localhost','127.0.0.1'].includes(resolvedUrl.hostname))) throw new Error('Production indexing requires a public HTTPS site URL.');
const dev = process.env.NODE_ENV === 'development';
const csp = [
  "default-src 'self'", "base-uri 'self'", "object-src 'none'", "frame-ancestors 'self'",
  "script-src 'self' 'unsafe-inline'" + (dev ? " 'unsafe-eval'" : ''),
  "style-src 'self' 'unsafe-inline'", "img-src 'self' data: blob:", "font-src 'self' data:",
  "connect-src 'self'" + (dev ? ' ws: wss:' : ''), "form-action 'self'", "frame-src 'none'"
].join('; ');
/** Baseline CSP keeps Next's static hydration compatible; no third-party scripts permitted. */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  env: { NEXT_PUBLIC_SITE_URL: resolvedUrl.origin, NEXT_PUBLIC_SITE_INDEXABLE: String(indexable) },
  devIndicators: false, poweredByHeader: false, compress: true, reactStrictMode: true,
  images: { formats: ['image/avif','image/webp'] },
  outputFileTracingIncludes: { '/api/og': ['./public/fonts/Poppins-SemiBold.ttf', './public/aarsoft-mark.png'] },
  async headers() {
    return [{ source: '/(.*)', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Content-Security-Policy', value: csp },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
      ...(!indexable ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : []),
      ...(process.env.ENABLE_HSTS === 'true' && resolvedUrl.protocol === 'https:' ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000' }] : [])
    ] }];
  }
};
export default nextConfig;
