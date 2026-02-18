# Contributing

Thanks for contributing to Smart Bookmark App.

## Prerequisites

- Node.js 18+ (Node 20 recommended)
- npm
- Supabase project with Auth + database access

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Start dev server:

```bash
npm run dev
```

## Coding Guidelines

- Use TypeScript strict mode conventions.
- Keep components focused and small.
- Prefer clear, explicit naming.
- Reuse existing Supabase client helpers in `lib/`.
- Keep auth-sensitive logic server-side where possible.

## Before Opening a PR

Run:

```bash
npm run lint
npm run build
```

Ensure:

- No TypeScript or lint errors
- Auth flow still works (`/` -> Google login -> `/dashboard`)
- Bookmark add/delete/realtime behavior still works
- Theme toggle works in both light and dark modes

## Branch and PR Conventions

- Branch naming: `feature/<short-name>`, `fix/<short-name>`, `chore/<short-name>`
- Keep PRs focused and reviewable
- Include a short summary of:
  - what changed
  - why it changed
  - how it was tested

## Commit Message Style (recommended)

Use concise conventional-style commits, for example:

- `feat: add bookmark edit action`
- `fix: handle invalid url normalization`
- `chore: clean up auth callback typing`

## Areas to Improve

- Add automated tests (unit + integration)
- Replace inline styles with a design system approach
- Add bookmark search/filter and tags
- Improve accessibility and keyboard support
