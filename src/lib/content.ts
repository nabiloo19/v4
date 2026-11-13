import site from '@/content/site.json'
import type { SiteContent } from '@/lib/content-schema'

// The type annotation makes `next build` fail if site.json drifts from the schema.
export const content: SiteContent = site
