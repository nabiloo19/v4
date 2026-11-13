// Minimal GitHub REST client for the content API. Every edit becomes a pull
// request against the production branch; Netlify builds a deploy preview for
// it; merging deploys it. Only branches under BRANCH_PREFIX are ever touched.

import type { Change, SiteContent } from '@/lib/content-schema'

export const CONTENT_PATH = 'src/content/site.json'
export const BRANCH_PREFIX = 'jh/'
const META_RE = /<!-- jh:meta ([A-Za-z0-9+/=]+) -->/

export class ConfigError extends Error {}
export class GitHubError extends Error {
  constructor(public status: number, message: string) { super(message) }
}

function cfg() {
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new ConfigError('server not configured: GITHUB_TOKEN is missing')
  return {
    token,
    repo: process.env.GITHUB_REPO || 'nabiloo19/v4',
    base: process.env.GITHUB_BRANCH || 'production',
  }
}

async function gh<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const { token, repo } = cfg()
  const api = process.env.GITHUB_API_URL || 'https://api.github.com'
  const res = await fetch(`${api}/repos/${repo}${path}`, {
    method: init.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'portfolio-content-api',
      ...(init.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    let msg = text
    try { msg = JSON.parse(text).message ?? text } catch {}
    throw new GitHubError(res.status, `GitHub ${init.method ?? 'GET'} ${path} failed (${res.status}): ${String(msg).slice(0, 300)}`)
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

const b64 = (s: string) => Buffer.from(s, 'utf8').toString('base64')
const unb64 = (s: string) => Buffer.from(s, 'base64').toString('utf8')
export const serialize = (c: SiteContent) => JSON.stringify(c, null, 2) + '\n'

export interface Base { commit: string; blob: string; content: SiteContent }

/** The live content: production head commit and site.json at exactly that commit. */
export async function readBase(): Promise<Base> {
  const { base } = cfg()
  const ref = await gh<{ object: { sha: string } }>(`/git/ref/heads/${base}`)
  const commit = ref.object.sha
  const file = await gh<{ sha: string; content: string }>(`/contents/${CONTENT_PATH}?ref=${commit}`)
  return { commit, blob: file.sha, content: JSON.parse(unb64(file.content)) as SiteContent }
}

export interface Meta { title: string; reason?: string; source?: string; changes: Change[] }

function show(v: unknown): string {
  if (v === undefined) return '(nothing)'
  return typeof v === 'string' ? v : JSON.stringify(v, null, 2)
}

function prBody(meta: Meta): string {
  const lines = [
    meta.reason ? `**Why:** ${meta.reason}` : '',
    meta.source ? `**From:** ${meta.source}` : '',
    '',
    `### ${meta.changes.length} change${meta.changes.length === 1 ? '' : 's'}`,
  ]
  for (const c of meta.changes) {
    lines.push('', `\`${c.op}\` \`${c.path}\``, '```diff')
    if (c.before !== undefined) lines.push(...show(c.before).split('\n').map(l => `- ${l}`))
    if (c.after !== undefined) lines.push(...show(c.after).split('\n').map(l => `+ ${l}`))
    lines.push('```')
  }
  lines.push('', 'Opened by Job Hunter through the portfolio content API. Merge to publish, close to discard.')
  let body = lines.join('\n')
  // Machine-readable copy for the API; dropped if it would push the body past GitHub's limit.
  const metaBlock = `\n\n<!-- jh:meta ${b64(JSON.stringify(meta))} -->`
  if (body.length + metaBlock.length < 60_000) body += metaBlock
  return body
}

function readMeta(body: string | null): Meta | null {
  const m = body?.match(META_RE)
  if (!m) return null
  try { return JSON.parse(unb64(m[1])) as Meta } catch { return null }
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'edit'
}

interface PR {
  number: number; title: string; state: 'open' | 'closed'; merged_at: string | null; html_url: string
  created_at: string; body: string | null; mergeable?: boolean | null; mergeable_state?: string
  head: { ref: string; sha: string }; base: { ref: string }
}

/** Creates jh/<slug> from the base commit, commits the new site.json, opens a PR. */
export async function openProposal(base: Base, next: SiteContent, meta: Meta) {
  const { base: baseBranch } = cfg()
  const branch = `${BRANCH_PREFIX}${slug(meta.title)}-${Date.now().toString(36)}`
  await gh(`/git/refs`, { method: 'POST', body: { ref: `refs/heads/${branch}`, sha: base.commit } })
  try {
    await gh(`/contents/${CONTENT_PATH}`, {
      method: 'PUT',
      body: { message: `content: ${meta.title}`, content: b64(serialize(next)), sha: base.blob, branch },
    })
    const pr = await gh<PR>(`/pulls`, {
      method: 'POST',
      body: { title: `Job Hunter: ${meta.title}`, head: branch, base: baseBranch, body: prBody(meta) },
    })
    return summarize(pr, null)
  } catch (err) {
    await gh(`/git/refs/heads/${branch}`, { method: 'DELETE' }).catch(() => {})
    throw err
  }
}

export interface Preview { state: 'pending' | 'ready' | 'failed' | 'unknown'; url: string | null }

/** Netlify reports deploy previews as commit statuses (and check runs). */
async function preview(pr: PR): Promise<Preview> {
  const guess = process.env.NETLIFY_SITE_NAME
    ? `https://deploy-preview-${pr.number}--${process.env.NETLIFY_SITE_NAME}.netlify.app`
    : null
  try {
    const s = await gh<{ statuses: { context: string; state: string; target_url: string | null }[] }>(
      `/commits/${pr.head.sha}/status`,
    )
    const hit = s.statuses.find(x => /deploy-preview/i.test(x.context)) ?? s.statuses.find(x => /netlify/i.test(x.context))
    if (hit) {
      const state = hit.state === 'success' ? 'ready' : hit.state === 'pending' ? 'pending' : 'failed'
      return { state, url: hit.target_url || guess }
    }
  } catch {}
  try {
    const c = await gh<{ check_runs: { name: string; status: string; conclusion: string | null; details_url: string | null }[] }>(
      `/commits/${pr.head.sha}/check-runs`,
    )
    const hit = c.check_runs.find(x => /deploy-preview/i.test(x.name))
    if (hit) {
      const state = hit.status !== 'completed' ? 'pending' : hit.conclusion === 'success' ? 'ready' : 'failed'
      return { state, url: guess ?? hit.details_url }
    }
  } catch {}
  return { state: 'unknown', url: guess }
}

function summarize(pr: PR, pv: Preview | null) {
  const meta = readMeta(pr.body)
  return {
    number: pr.number,
    title: meta?.title ?? pr.title,
    reason: meta?.reason ?? null,
    source: meta?.source ?? null,
    changes: meta?.changes ?? [],
    status: pr.merged_at ? 'merged' : pr.state === 'open' ? 'open' : 'closed',
    url: pr.html_url,
    branch: pr.head.ref,
    createdAt: pr.created_at,
    preview: pv,
    mergeable: pr.mergeable ?? null,
  }
}

const ours = (pr: PR) => pr.head.ref.startsWith(BRANCH_PREFIX) && pr.base.ref === cfg().base

export async function listProposals(state: 'open' | 'all') {
  const { base } = cfg()
  const prs = await gh<PR[]>(`/pulls?state=${state}&base=${base}&per_page=50&sort=created&direction=desc`)
  const mine = prs.filter(ours)
  return Promise.all(mine.map(async pr => summarize(pr, pr.state === 'open' ? await preview(pr) : null)))
}

async function getOurs(n: number): Promise<PR> {
  const pr = await gh<PR>(`/pulls/${n}`)
  if (!ours(pr)) throw new GitHubError(404, `#${n} is not a Job Hunter proposal`)
  return pr
}

export async function getProposal(n: number) {
  const pr = await getOurs(n)
  return summarize(pr, pr.state === 'open' ? await preview(pr) : null)
}

/** Squash-merges the PR (which deploys it), after checking it only touches site.json. */
export async function approveProposal(n: number) {
  const pr = await getOurs(n)
  if (pr.state !== 'open') throw new GitHubError(409, `#${n} is already ${pr.merged_at ? 'merged' : 'closed'}`)
  const files = await gh<{ filename: string }[]>(`/pulls/${n}/files`)
  const other = files.filter(f => f.filename !== CONTENT_PATH)
  if (other.length) throw new GitHubError(409, `#${n} changes files other than ${CONTENT_PATH}; merge it on GitHub instead`)
  try {
    await gh(`/pulls/${n}/merge`, {
      method: 'PUT',
      body: { merge_method: 'squash', sha: pr.head.sha, commit_title: `content: ${readMeta(pr.body)?.title ?? pr.title} (#${n})` },
    })
  } catch (err) {
    if (err instanceof GitHubError && (err.status === 405 || err.status === 409)) {
      throw new GitHubError(409, `#${n} can't be merged (another edit changed the same lines). Reject it and send it again.`)
    }
    throw err
  }
  await gh(`/git/refs/heads/${pr.head.ref}`, { method: 'DELETE' }).catch(() => {})
  return getProposal(n)
}

export async function rejectProposal(n: number) {
  const pr = await getOurs(n)
  if (pr.state === 'open') await gh(`/pulls/${n}`, { method: 'PATCH', body: { state: 'closed' } })
  await gh(`/git/refs/heads/${pr.head.ref}`, { method: 'DELETE' }).catch(() => {})
  return getProposal(n)
}
