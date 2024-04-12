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
          },
          {
            protocol: "http",
            hostname: "placeimg.com"
          },
          {
            protocol: "http",
            hostname: "res.cloudinary.com"
          }
        ]
    }
};


export default nextConfig;
