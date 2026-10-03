/*
 * The public address the site describes itself by: canonical links, the
 * sitemap, robots.txt and share previews all read it.
 *
 * An explicit NEXT_PUBLIC_SITE_URL always wins. Otherwise, on Vercel, it
 * follows the project's production domain, which is the .vercel.app address
 * until a custom domain is assigned and that domain afterwards, so moving
 * to www.aarsoft.com later needs no code change. Locally it is localhost.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  reactStrictMode: true,
  // Hide the round "N" badge Next.js shows in a corner while running in development.
  devIndicators: false,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
