import { adapter } from './adapter.mjs'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

const exclude_vercel_packages = ['nock', 'mock-aws-s3', 'aws-sdk']

export default defineConfig({
  adapter,
  output: 'server',
  compressHTML: true,
  integrations: [tailwind()],
  vite: {
    optimizeDeps: {
      exclude: exclude_vercel_packages,
    },
    ssr: {
      external: exclude_vercel_packages,
    },
  },
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
  },
})
