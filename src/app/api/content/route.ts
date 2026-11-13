import { FORMAT_NOTES, textLimits } from '@/lib/content-schema'
import { readBase } from '@/lib/server/github'
import { authorized, fail, json, unauthorized } from '@/lib/server/http'

export const dynamic = 'force-dynamic'

/** GET /api/content: the live site content (production head) and its version. */
export async function GET(req: Request) {
  if (!authorized(req)) return unauthorized()
  try {
    const base = await readBase()
    return json({ version: base.commit, content: base.content, format: FORMAT_NOTES, limits: textLimits() })
  } catch (err) {
    return fail(err)
  }
}
