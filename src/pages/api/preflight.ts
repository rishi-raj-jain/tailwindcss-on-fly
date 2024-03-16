import postcss from 'postcss'
import tailwindcss from 'tailwindcss'

const baseConfig = { content: ['/**/*'] }

const sourceCSS = `@tailwind base;`

async function generate(raw) {
    const tailwindConfig = {
        presets: [baseConfig],
        content: [{ raw, extension: 'html' }],
    }
    return (await postcss([tailwindcss(tailwindConfig)]).process(sourceCSS)).css
}

export async function GET() {
    const tmp = await generate('')
    return new Response(tmp, {
        headers: {
            'Content-Type': 'text/css',
        },
    })
}

