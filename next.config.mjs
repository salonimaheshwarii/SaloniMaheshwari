/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/SaloniMaheshwari",
  assetPrefix: "/SaloniMaheshwari/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
