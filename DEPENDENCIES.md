# Dependency audit

Last reviewed: 2026-10-12, against `@sveltejs/kit@2.70.3`, `vite@5.4.21`,
`svelte@4.2.20`.

`npm audit` reports **14 advisories (4 low, 9 moderate, 1 high)**. None of them
are fixable without a major-version bump: `npm audit fix` (non-breaking) is a
no-op, and every remaining suggestion requires `--force`.

## Why they are being left in place

The advisories fall into two groups, and neither reaches the deployed site.

### 1. Vite / esbuild — dev server only (1 high, 3 moderate)

| Advisory                                            | Severity |
| --------------------------------------------------- | -------- |
| `server.fs.deny` bypass via Windows alternate paths | high     |
| Path traversal in optimised-deps `.map` handling    | moderate |
| `launch-editor` NTLMv2 hash disclosure (Windows)    | moderate |
| `esbuild` dev-server request handling               | moderate |

All four affect `npm run dev` only. Nothing in this list applies to the static
files emitted into `build/` and served by Netlify. The high-severity one is
additionally Windows-specific, and development happens in WSL on Linux.

Fixing them means Vite 5 → 8.

### 2. Svelte — SSR only (6 moderate)

Every Svelte advisory is an SSR issue: spread-attribute XSS, prototype-chain
attribute leakage, unvalidated `<svelte:element>` tags, and `contenteditable`
bindings during SSR.

This app sets `export const ssr = false` in `src/routes/+layout.js`, so
SvelteKit never server-renders these routes — the affected code paths are not
exercised. Fixing them means Svelte 4 → 5.

### 3. Tooling (3 low, 1 moderate)

`eslint-plugin-svelte` → `postcss-selector-parser` (quadratic parsing; build-time
only), plus `cookie` and the SvelteKit adapters. All dev/build-time.

`@tabler/icons-svelte` is flagged only because it depends on a Svelte version
with the SSR advisories above, so it is blocked on the same Svelte 5 migration.

## If the warnings ever need to go

They are resolved together, not piecemeal, as one migration:

- `svelte` 4 → 5 (runes; this is the largest piece of work and touches every component)
- `@sveltejs/kit` 2 → 3, `vite` 5 → 8, `@sveltejs/vite-plugin-svelte` 3 → 7
- `@tabler/icons-svelte` 2 → 3, `eslint-plugin-svelte` 2 → 3

Re-run `npm audit` afterwards and confirm `ssr = false` is still set, since that
setting is what keeps the Svelte advisories inert.

## Verifying

```bash
npm audit
npm run check   # eslint + prettier
npm run build
```
