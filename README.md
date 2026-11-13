This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Content and the content API

All site text lives in `src/content/site.json`. The sections read it through `src/lib/content.ts`, and `next build` fails if the file no longer matches the types in `src/lib/content-schema.ts`.

The content API lets Job Hunter propose edits. Nothing goes live on its own: every edit becomes a pull request against `production`, Netlify builds a deploy preview, and merging (from Job Hunter or GitHub) publishes it.

All endpoints need `Authorization: Bearer <CONTENT_API_KEY>`.

| Method | Path | What it does |
| --- | --- | --- |
| GET | `/api/content` | Live content from `production`, its commit (`version`), format notes and per-field length limits |
| POST | `/api/proposals` | `{ title, reason?, source?, ops, dryRun? }`. Validates the edits; `dryRun: true` returns the result without touching GitHub, otherwise opens a PR |
| GET | `/api/proposals?state=open\|all` | Job Hunter PRs (branches under `jh/`), with deploy preview status |
| GET | `/api/proposals/:number` | One proposal |
| POST | `/api/proposals/:number` | `{ action: "approve" }` squash-merges it, `{ action: "reject" }` closes it |

`ops` use JSON Pointer paths into `site.json`:

```json
[
  { "op": "set", "path": "/jobs/0/bullets/1", "value": "New text", "expect": "Text you saw" },
  { "op": "insert", "path": "/skills/categories/0/items/-", "value": "Docs as code" },
  { "op": "remove", "path": "/otherProjects/9", "expect": { "...": "the item you saw" } }
]
```

`expect` is optional. When given, the edit is refused with 409 if the site changed since. Unknown fields, non-http links, empty or overlong text and anything that breaks the schema are refused with 422. Approve refuses a PR that changes any file other than `site.json`.

Netlify environment variables:

- `CONTENT_API_KEY`: a long random string (24+ characters). Job Hunter uses the same value as `PORTFOLIO_API_KEY`.
- `GITHUB_TOKEN`: a fine-grained token for this repo only, with Contents (read and write), Pull requests (read and write) and Commit statuses (read).
- Optional: `GITHUB_REPO` (default `nabiloo19/v4`), `GITHUB_BRANCH` (default `production`).
