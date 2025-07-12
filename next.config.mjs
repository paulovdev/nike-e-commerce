/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "artwalk.vtexassets.com",
      "imgnike-a.akamaihd.net",
      "static.nike.com",
    ],
  },
};

export default nextConfig;
