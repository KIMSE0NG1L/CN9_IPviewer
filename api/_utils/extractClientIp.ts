import type { IncomingHttpHeaders } from 'node:http'

function firstValue(value: string | string[] | undefined): string | null {
  if (!value) return null
  const raw = Array.isArray(value) ? value[0] : value
  const first = raw.split(',')[0]?.trim()
  return first && first.length > 0 ? first : null
}

/**
 * Resolves the client IP as observed by Vercel's edge network.
 * `x-vercel-forwarded-for` is set by Vercel itself and cannot be spoofed by
 * the client, so it takes priority over the generic `x-forwarded-for`.
 */
export function extractClientIp(
  headers: IncomingHttpHeaders,
  remoteAddress?: string | null,
): string | null {
  return (
    firstValue(headers['x-vercel-forwarded-for']) ??
    firstValue(headers['x-forwarded-for']) ??
    firstValue(headers['x-real-ip']) ??
    remoteAddress ??
    null
  )
}
