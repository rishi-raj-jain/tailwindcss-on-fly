import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import type { APIContext } from 'astro'

const baseConfig = { content: ['/**/*'] }

const sourceCSS = `@tailwind components;
@tailwind utilities;`

async function generate(raw) {
  const tailwindConfig = {
    presets: [baseConfig],
    content: [{ raw, extension: 'html' }],
  }
  return (await postcss([tailwindcss(tailwindConfig)]).process(sourceCSS)).css
}

export async function GET({ request }: APIContext) {
  const html = new URL(request.url, 'https://a.b').searchParams.get('html')
  const tmp = await generate(html)
  return new Response(tmp, {
    headers: {
      'Content-Type': 'text/css',
    },
  })
}

export async function POST({ request }: APIContext) {
  const { html } = await request.json()
  const tmp = await generate(html)
  return new Response(tmp, {
    headers: {
      'Content-Type': 'text/css',
    },
  })
}
