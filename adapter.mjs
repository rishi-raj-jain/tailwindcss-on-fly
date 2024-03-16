import dotenv from 'dotenv'
dotenv.config()

import node from '@astrojs/node'

const nodeAdapter = node({
  mode: 'standalone',
})

const adapters = {
  node: nodeAdapter,
}

export const adapter = adapters['node']
