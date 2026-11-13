import { createHash, timingSafeEqual } from 'crypto'
import { OpError } from '@/lib/content-schema'
import { ConfigError, GitHubError } from '@/lib/server/github'

export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

/** Bearer CONTENT_API_KEY, compared in constant time. Refuses if the key is unset or short. */
export function authorized(req: Request): boolean {
  const key = process.env.CONTENT_API_KEY ?? ''
  if (key.length < 24) return false
  const got = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '')
  const a = createHash('sha256').update(got).digest()
  const b = createHash('sha256').update(key).digest()
  return timingSafeEqual(a, b)
}

export const unauthorized = () => json({ error: 'unauthorized' }, 401)

export async function readJson(req: Request, maxBytes = 200_000): Promise<unknown> {
  const text = await req.text()
  if (text.length > maxBytes) throw new OpError('request body too large')
  try { return JSON.parse(text) } catch { throw new OpError('body must be JSON') }
}

export function fail(err: unknown) {
  if (err instanceof OpError) return json({ error: err.message, stale: err.stale }, err.stale ? 409 : 422)
  if (err instanceof ConfigError) return json({ error: err.message }, 500)
  if (err instanceof GitHubError) {
    const status = err.status === 404 ? 404 : err.status === 409 || err.status === 405 ? 409 : 502
    return json({ error: err.message }, status)
  }
  console.error(err)
  return json({ error: 'internal error' }, 500)
}
