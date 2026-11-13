import { OpError } from '@/lib/content-schema'
import { approveProposal, getProposal, rejectProposal } from '@/lib/server/github'
import { authorized, fail, json, readJson, unauthorized } from '@/lib/server/http'

export const dynamic = 'force-dynamic'

type Ctx = { params: { number: string } }

function num(ctx: Ctx): number {
  const n = Number(ctx.params.number)
  if (!Number.isInteger(n) || n <= 0) throw new OpError('bad proposal number')
  return n
}

/** GET /api/proposals/:number: one proposal with preview status. */
export async function GET(req: Request, ctx: Ctx) {
  if (!authorized(req)) return unauthorized()
  try {
    return json({ proposal: await getProposal(num(ctx)) })
  } catch (err) {
    return fail(err)
  }
}

/** POST /api/proposals/:number { action: "approve" | "reject" }: approve merges (deploys), reject closes. */
export async function POST(req: Request, ctx: Ctx) {
  if (!authorized(req)) return unauthorized()
  try {
    const n = num(ctx)
    const { action } = ((await readJson(req, 1000)) ?? {}) as { action?: unknown }
    if (action === 'approve') return json({ proposal: await approveProposal(n) })
    if (action === 'reject') return json({ proposal: await rejectProposal(n) })
    throw new OpError('action must be "approve" or "reject"')
  } catch (err) {
    return fail(err)
  }
}
