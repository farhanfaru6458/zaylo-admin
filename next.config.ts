/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "mundodotaciones.com" },
      { protocol: "https", hostname: "www.mundodotaciones.com" },
      { protocol: "https", hostname: "api.escuelajs.co" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "www.shutterstock.com" } // ✅ NEW
    ]
  }
};

module.exports = nextConfig;
