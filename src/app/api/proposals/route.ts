import { applyOps, OpError } from '@/lib/content-schema'
import { listProposals, openProposal, readBase } from '@/lib/server/github'
import { authorized, fail, json, readJson, unauthorized } from '@/lib/server/http'

export const dynamic = 'force-dynamic'

/** GET /api/proposals?state=open|all: Job Hunter proposals (open ones include preview status). */
export async function GET(req: Request) {
  if (!authorized(req)) return unauthorized()
  try {
    const state = new URL(req.url).searchParams.get('state') === 'all' ? 'all' : 'open'
    return json({ proposals: await listProposals(state) })
  } catch (err) {
    return fail(err)
  }
}

function text(v: unknown, name: string, max: number, required: boolean): string | undefined {
  if (v === undefined || v === null || v === '') {
    if (required) throw new OpError(`${name} is required`)
    return undefined
  }
  if (typeof v !== 'string' || v.trim().length === 0) throw new OpError(`${name} must be text`)
  if (v.length > max) throw new OpError(`${name} is longer than ${max} characters`)
  return v.trim()
}

/**
 * POST /api/proposals { title, reason?, source?, ops, dryRun? }
 * Validates the ops against the live content. dryRun returns the changes and
 * the resulting content without touching GitHub; otherwise opens a PR.
 */
export async function POST(req: Request) {
  if (!authorized(req)) return unauthorized()
  try {
    const body = (await readJson(req)) as Record<string, unknown>
    if (!body || typeof body !== 'object') throw new OpError('body must be an object')
    const title = text(body.title, 'title', 100, true)!
    const reason = text(body.reason, 'reason', 1000, false)
    const source = text(body.source, 'source', 200, false)

    const base = await readBase()
    const { next, changes } = applyOps(base.content, body.ops)
    if (JSON.stringify(next) === JSON.stringify(base.content)) throw new OpError('these ops change nothing')

    if (body.dryRun === true) return json({ dryRun: true, version: base.commit, changes, content: next })
    const proposal = await openProposal(base, next, { title, reason, source, changes })
    return json({ proposal }, 201)
  } catch (err) {
    return fail(err)
  }
}
