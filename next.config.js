/** @type {import('next').NextConfig} */

// Conservar URLs históricas y sus redirecciones.
const robotRedirects = [
  ["botmate-serve", "bellabot-pro"],
  ["botmate-ads", "kettybot-pro"],
  ["swiftbot", "botmate-glide"],
  ["flashbot", "botmate-tower"],
  ["holabot", "botmate-carry"],
  ["botmate-flex", "pudubot-2"],
  ["cc1", "pudu-cc1"],
  ["sh1", "pudu-sh1"],
  ["t300", "pudu-t300"],
  ["t600", "pudu-t600"],
].map(([from, to]) => ({
  source: `/robots/${from}`,
  destination: `/robots/${to}`,
  permanent: true,
}));

const blogRedirects = [
  ["bellabot-vs-kettybot-cual-elegir", "botmate-serve-vs-botmate-ads-cual-elegir"],
  ["limpieza-autonoma-cc1-vs-tradicional", "limpieza-autonoma-botmate-clean-vs-tradicional"],
].map(([from, to]) => ({
  source: `/blog/${from}`,
  destination: `/blog/${to}`,
  permanent: true,
}));

const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
  poweredByHeader: false,
  images: {
    remotePatterns: [],
    formats: ["image/webp"],
    qualities: [75, 85, 90],
  },
  async redirects() {
    return [...robotRedirects, ...blogRedirects];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
