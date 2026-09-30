import type { VercelRequest, VercelResponse } from '@vercel/node'
import { extractClientIp } from './_utils/extractClientIp.js'

export default function handler(req: VercelRequest, res: VercelResponse): void {
  // Never cache this response: each visitor must see their own IP, and
  // nothing about the request is persisted anywhere.
  res.setHeader('Cache-Control', 'no-store')

  const ip = extractClientIp(req.headers, req.socket?.remoteAddress)

  res.status(200).json({ ip })
}
