# Dependency audit

Last reviewed: 2026-10-12, against `svelte@5.57.2`, `@sveltejs/kit@2.70.3`,
`vite@5.4.21`, `@tabler/icons-svelte@3.49.0`.

`npm audit` reports **11 advisories (4 low, 6 moderate, 1 high)**. None are
fixable without a major-version bump: `npm audit fix` (non-breaking) is a
no-op, and every remaining suggestion requires `--force`.

## Already resolved by the Svelte 5 migration

On Svelte 4 this reported 14 advisories, including six against `svelte` itself.
All six were SSR-only: spread-attribute XSS, prototype-chain attribute leakage,
unvalidated `<svelte:element>` tags, and `contenteditable` bindings during SSR.

They were inert here because `src/routes/+layout.js` sets
`export const ssr = false` and the site is prerendered with adapter-static, so
those code paths never execute.

Moving to Svelte 5 (and `@tabler/icons-svelte` v2 → v3, which was the dependency
that actually blocked the upgrade) cleared all six. Count went 14 → 11.

## What remains

### 1. Vite / esbuild — dev server only (1 high, 4 moderate)

| Advisory                                            | Severity |
| --------------------------------------------------- | -------- |
| `server.fs.deny` bypass via Windows alternate paths | high     |
| Path traversal in optimised-deps `.map` handling    | moderate |
| `launch-editor` NTLMv2 hash disclosure (Windows)    | moderate |
| `esbuild` dev-server request handling               | moderate |
| `@sveltejs/vite-plugin-svelte` / `-inspector`       | moderate |

All affect `npm run dev` only. None apply to the static files emitted into
`build/` and served by Netlify. The high-severity one is additionally
Windows-specific, and development happens in WSL on Linux.

### 2. Tooling — build time only (3 low, 2 moderate)

- `eslint-plugin-svelte` → `postcss-selector-parser` (quadratic parsing; lint time)
- `vite-node`, used by `scripts/validate-data.mts`
- `cookie`, via SvelteKit
- `@sveltejs/adapter-static` and `@sveltejs/adapter-auto`

`@tabler/icons-svelte` no longer appears at all: v3 declares a peer range that
includes Svelte 5.

## If the warnings ever need to go

The remainder is a single migration, all dev/build-time:

- `vite` 5 → 8 and `@sveltejs/vite-plugin-svelte` 4 → 7 (dev server)
- `@sveltejs/kit` 2 → 3, `@sveltejs/adapter-static` 3 → 4 (low, cookie)
- `eslint-plugin-svelte` 2 → 3 (build-time lint)

Re-run `npm audit` afterwards.

## Verifying

```bash
npm audit
npm run check   # eslint + prettier + svelte-check + data validation
npm run build
```
