import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { extractClientIp } from './api/_utils/extractClientIp.js'

/**
 * Mirrors `api/ip.ts` during `vite dev`, since Vite does not execute Vercel
 * serverless functions on its own. On localhost this will just report the
 * loopback address, but it keeps the full request/response flow testable
 * without needing `vercel dev`.
 */
function ipApiDevMiddleware(): Plugin {
  return {
    name: 'ip-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/ip', (req, res) => {
        const ip = extractClientIp(req.headers, req.socket?.remoteAddress)
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'no-store')
        res.end(JSON.stringify({ ip }))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ipApiDevMiddleware()],
})
