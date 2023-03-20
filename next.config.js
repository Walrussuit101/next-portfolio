const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [require("remark-prism")],
      rehypePlugins: []
    }
  })
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], // page extensions to include md & mdx
    reactStrictMode: true
  }
  
  // Merge MDX config with Next.js config
  module.exports = withMDX(nextConfig)