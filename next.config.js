/** @type {import('next').NextConfig} */

// Robots renombrados a marca BotMate — redirige las URLs viejas (301/308)
const robotRedirects = [
  ["bellabot-pro", "botmate-serve"],
  ["kettybot-pro", "botmate-ads"],
  ["swiftbot", "botmate-glide"],
  ["flashbot", "botmate-tower"],
  ["holabot", "botmate-carry"],
  ["pudubot-2", "botmate-flex"],
  ["cc1", "botmate-clean"],
  ["sh1", "botmate-clean-mini"],
  ["t300", "botmate-cargo-300"],
  ["t600", "botmate-cargo-600"],
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
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
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
        ],
      },
    ];
  },
};

module.exports = nextConfig;
