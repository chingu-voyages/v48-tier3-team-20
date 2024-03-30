/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "picsum.photos",
          },
          {
            protocol: "https",
            hostname: "loremflickr.com",
          },
          {
            protocol: "https",
            hostname: "example.com"
          }
        ]
    }
};


export default nextConfig;
