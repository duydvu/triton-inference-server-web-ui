/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_WEBUI_BASEPATH,
  output: 'standalone',
}

module.exports = nextConfig
