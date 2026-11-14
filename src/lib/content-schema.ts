// Shape of src/content/site.json, plus the rules the content API uses to
// validate and apply edits. Pure functions only: no React, no I/O.

export interface Stat { value: string; label: string }
export interface LabelValue { label: string; value: string }
export interface Job { company: string; title: string; range: string; url: string; bullets: string[] }
export interface FeaturedProject {
  title: string; description: string; tech: string[]; external: string; metric: string; cta?: string
}
export interface OtherProject {
  title: string; company: string; description: string; tech: string[]; external: string; github?: string
}

export interface SiteContent {
  profile: { name: string; jobTitle: string; email: string; resumeUrl: string }
  seo: { title: string; description: string; ogDescription: string; twitterDescription: string; personDescription: string }
  hero: { eyebrow: string; headline: string[]; headlineRotate: string[]; headlineAfter: string[]; headlineAccent: string; subtitle: string; stats: Stat[] }
  about: { quote: string; paragraphs: string[]; highlights: LabelValue[] }
  services: { items: { title: string; description: string }[]; availability: string }
  process: { intro: string; steps: { title: string; description: string }[] }
  aiWriting: {
    intro: string
    pillars: { tag: string; title: string; body: string; detail: string }[]
    closing: string
  }
  skills: { categories: { label: string; items: string[] }[]; marquee: string[][] }
  featuredProjects: FeaturedProject[]
  otherProjects: OtherProject[]
  jobs: Job[]
  contact: { headline: string[]; headlineAccent: string; text: string }
  socialLinks: { name: string; href: string }[]
}

// ---------- runtime spec ----------

type Spec =
  | { t: 'str'; max: number; min?: number; kind?: 'url' | 'url-or-empty' | 'email'; optional?: boolean }
  | { t: 'arr'; of: Spec; max: number; min?: number }
  | { t: 'obj'; fields: Record<string, Spec> }

const str = (max: number, extra: Partial<Extract<Spec, { t: 'str' }>> = {}): Spec => ({ t: 'str', max, min: 1, ...extra })
const arr = (of: Spec, max: number, min = 1): Spec => ({ t: 'arr', of, max, min })
const obj = (fields: Record<string, Spec>): Spec => ({ t: 'obj', fields })
const url = (optional = false): Spec => ({ t: 'str', max: 300, min: 1, kind: 'url', optional })

const SHORT = 120
const LINE = 300
const PARA = 900

export const siteSpec: Spec = obj({
  profile: obj({ name: str(80), jobTitle: str(SHORT), email: str(120, { kind: 'email' }), resumeUrl: url() }),
  seo: obj({
    title: str(SHORT), description: str(LINE), ogDescription: str(LINE),
    twitterDescription: str(LINE), personDescription: str(LINE),
  }),
  hero: obj({
    eyebrow: str(SHORT), headline: arr(str(60), 4), headlineRotate: arr(str(24), 8), headlineAfter: arr(str(60), 4),
    headlineAccent: str(60), subtitle: str(LINE),
    stats: arr(obj({ value: str(12), label: str(24) }), 6),
  }),
  about: obj({
    quote: str(LINE), paragraphs: arr(str(PARA), 6),
    highlights: arr(obj({ label: str(40), value: str(60) }), 8),
  }),
  services: obj({ items: arr(obj({ title: str(60), description: str(LINE) }), 9), availability: str(LINE) }),
  process: obj({ intro: str(SHORT), steps: arr(obj({ title: str(40), description: str(LINE) }), 8) }),
  aiWriting: obj({
    intro: str(PARA),
    pillars: arr(obj({ tag: str(24), title: str(SHORT), body: str(PARA), detail: str(SHORT) }), 4),
    closing: str(LINE),
  }),
  skills: obj({
    categories: arr(obj({ label: str(40), items: arr(str(60), 12) }), 6),
    marquee: arr(arr(str(60), 20), 3),
  }),
  featuredProjects: arr(obj({
    title: str(SHORT), description: str(PARA), tech: arr(str(60), 10), external: url(),
    metric: str(80), cta: url(true),
  }), 6),
  otherProjects: arr(obj({
    title: str(SHORT), company: str(80), description: str(LINE), tech: arr(str(60), 10),
    external: url(), github: url(true),
  }), 30, 0),
  jobs: arr(obj({
    company: str(80), title: str(SHORT), range: str(40),
    url: { t: 'str', max: 300, kind: 'url-or-empty' },
    bullets: arr(str(400), 8),
  }), 20),
  contact: obj({ headline: arr(str(60), 4), headlineAccent: str(60), text: str(LINE) }),
  socialLinks: arr(obj({ name: str(30), href: url() }), 10),
})

const URL_RE = /^https?:\/\/[^\s<>"']+$/i
const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[a-z]{2,}$/i

/** Returns a list of problems; empty means valid. */
export function validate(value: unknown, spec: Spec = siteSpec, path = ''): string[] {
  const at = path || '/'
  if (spec.t === 'str') {
    if (typeof value !== 'string') return [`${at}: expected text`]
    const errs: string[] = []
    if (value.length < (spec.min ?? 0)) errs.push(`${at}: must not be empty`)
    if (value.length > spec.max) errs.push(`${at}: longer than ${spec.max} characters`)
    if (value !== value.trim()) errs.push(`${at}: has leading or trailing spaces`)
    if (spec.kind === 'url' && !URL_RE.test(value)) errs.push(`${at}: must be an http(s) link`)
    if (spec.kind === 'url-or-empty' && value !== '' && !URL_RE.test(value)) errs.push(`${at}: must be an http(s) link or empty`)
    if (spec.kind === 'email' && !EMAIL_RE.test(value)) errs.push(`${at}: must be an email address`)
    return errs
  }
  if (spec.t === 'arr') {
    if (!Array.isArray(value)) return [`${at}: expected a list`]
    const errs: string[] = []
    if (value.length < (spec.min ?? 0)) errs.push(`${at}: needs at least ${spec.min} item(s)`)
    if (value.length > spec.max) errs.push(`${at}: more than ${spec.max} items`)
    value.forEach((v, i) => errs.push(...validate(v, spec.of, `${path}/${i}`)))
    return errs
  }
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return [`${at}: expected an object`]
  const errs: string[] = []
  const rec = value as Record<string, unknown>
  for (const key of Object.keys(rec)) {
    if (!(key in spec.fields)) errs.push(`${path}/${key}: is not an editable field`)
  }
  for (const [key, fieldSpec] of Object.entries(spec.fields)) {
    const optional = fieldSpec.t === 'str' && fieldSpec.optional
    if (!(key in rec) || rec[key] === undefined) {
      if (!optional) errs.push(`${path}/${key}: is required`)
      continue
    }
    errs.push(...validate(rec[key], fieldSpec, `${path}/${key}`))
  }
  return errs
}

// ---------- edit operations ----------

export type Op =
  | { op: 'set'; path: string; value: unknown; expect?: unknown }
  | { op: 'insert'; path: string; value: unknown }
  | { op: 'remove'; path: string; expect?: unknown }

export interface Change { op: Op['op']; path: string; before: unknown; after: unknown }

export class OpError extends Error {
  constructor(message: string, public stale = false) { super(message) }
}

const FORBIDDEN = new Set(['__proto__', 'constructor', 'prototype'])

function parsePath(path: unknown): string[] {
  if (typeof path !== 'string' || !path.startsWith('/') || path.length < 2) {
    throw new OpError(`bad path ${JSON.stringify(path)}: use a JSON Pointer like /jobs/0/bullets/1`)
  }
  const parts = path.slice(1).split('/').map(s => s.replace(/~1/g, '/').replace(/~0/g, '~'))
  for (const p of parts) if (p === '' || FORBIDDEN.has(p)) throw new OpError(`bad path segment in ${path}`)
  return parts
}

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

function walk(root: unknown, parts: string[], path: string): unknown {
  let cur: unknown = root
  for (const p of parts) {
    if (Array.isArray(cur)) {
      const i = Number(p)
      if (!Number.isInteger(i) || i < 0 || i >= cur.length) throw new OpError(`${path}: no item at index ${p}`)
      cur = cur[i]
    } else if (cur && typeof cur === 'object' && Object.prototype.hasOwnProperty.call(cur, p)) {
      cur = (cur as Record<string, unknown>)[p]
    } else {
      throw new OpError(`${path}: does not exist`)
    }
  }
  return cur
}

/** Applies ops to a copy of `content`. Throws OpError; validates the result. */
export function applyOps(content: SiteContent, ops: unknown): { next: SiteContent; changes: Change[] } {
  if (!Array.isArray(ops) || ops.length === 0) throw new OpError('ops must be a non-empty list')
  if (ops.length > 50) throw new OpError('at most 50 ops per proposal')
  const next = structuredClone(content) as unknown as Record<string, unknown>
  const changes: Change[] = []

  for (const raw of ops) {
    if (!raw || typeof raw !== 'object') throw new OpError('each op must be an object')
    const op = raw as Op
    const parts = parsePath(op.path)
    const parent = walk(next, parts.slice(0, -1), op.path)
    const last = parts[parts.length - 1]

    if (op.op === 'set') {
      if (!Object.prototype.hasOwnProperty.call(op, 'value')) throw new OpError(`${op.path}: set needs a value`)
      let before: unknown
      if (Array.isArray(parent)) {
        before = walk(next, parts, op.path)
        parent[Number(last)] = structuredClone(op.value)
      } else if (parent && typeof parent === 'object') {
        before = Object.prototype.hasOwnProperty.call(parent, last) ? (parent as Record<string, unknown>)[last] : undefined
        ;(parent as Record<string, unknown>)[last] = structuredClone(op.value)
      } else throw new OpError(`${op.path}: parent is not editable`)
      if ('expect' in op && !deepEqual(before, op.expect)) {
        throw new OpError(`${op.path}: the site changed since this edit was made`, true)
      }
      changes.push({ op: 'set', path: op.path, before, after: op.value })
    } else if (op.op === 'insert') {
      if (!Array.isArray(parent)) throw new OpError(`${op.path}: insert only works inside a list`)
      const i = last === '-' ? parent.length : Number(last)
      if (!Number.isInteger(i) || i < 0 || i > parent.length) throw new OpError(`${op.path}: bad insert index`)
      parent.splice(i, 0, structuredClone(op.value))
      changes.push({ op: 'insert', path: op.path.replace(/\/-$/, `/${i}`), before: undefined, after: op.value })
    } else if (op.op === 'remove') {
      const before = walk(next, parts, op.path)
      if ('expect' in op && !deepEqual(before, op.expect)) {
        throw new OpError(`${op.path}: the site changed since this edit was made`, true)
      }
      if (Array.isArray(parent)) parent.splice(Number(last), 1)
      else delete (parent as Record<string, unknown>)[last]
      changes.push({ op: 'remove', path: op.path, before, after: undefined })
    } else {
      throw new OpError(`unknown op ${JSON.stringify((op as { op?: unknown }).op)}: use set, insert or remove`)
    }
  }

  const errs = validate(next)
  if (errs.length) throw new OpError(`the edited content is not valid: ${errs.slice(0, 8).join('; ')}`)
  return { next: next as unknown as SiteContent, changes }
}

// Max length per text field, keyed by path with each list index written as "*"
// (so every job bullet shares the key /jobs/*/bullets/*).
export function textLimits(spec: Spec = siteSpec, path = '', out: Record<string, number> = {}): Record<string, number> {
  if (spec.t === 'str') out[path] = spec.max
  else if (spec.t === 'arr') textLimits(spec.of, `${path}/*`, out)
  else for (const [k, f] of Object.entries(spec.fields)) textLimits(f, `${path}/${k}`, out)
  return out
}

/** Notes returned by GET /api/content so callers know the conventions. */
export const FORMAT_NOTES = {
  paths: 'JSON Pointer into the content, e.g. /jobs/0/bullets/1. Use /- at the end of a list path to append.',
  ops: 'set {path, value, expect?}, insert {path, value}, remove {path, expect?}. expect = the value you saw; the edit is refused if the site changed since.',
  inline: 'In about.paragraphs, **text** = dark emphasis, ==text== = accent colour. Everything else is plain text.',
  experience: 'The Experience section shows one job at a time (a tab per company) with all of its bullets; put the most important bullet first.',
  ids: 'featuredProjects are numbered by position (01, 02, ...); process steps likewise.',
}
