/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')()
const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'c-ssl.dtstatic.com',
  //     },
  //   ],
  // },
  reactStrictMode: false,
}

module.exports = removeImports(nextConfig)
