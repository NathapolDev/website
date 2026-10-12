# Dependency audit

Last reviewed: 2026-10-12, against `svelte@5.57.2`, `@sveltejs/kit@3.0.1`,
`vite@8.3.4`, `@sveltejs/vite-plugin-svelte@7.3.1`.

```
$ npm audit
found 0 vulnerabilities
```

## How it got here

**14 advisories** at the start of the modernisation work. They cleared in three
steps rather than one:

1. **Svelte 5 migration** (14 -> 11). Six were against `svelte` itself, all
   SSR-only: spread-attribute XSS, prototype-chain attribute leakage,
   unvalidated `<svelte:element>` tags and `contenteditable` bindings during
   SSR. They were inert here because `src/routes/+layout.js` sets
   `export const ssr = false` and the site is prerendered with adapter-static,
   so those paths never execute. The upgrade also required
   `@tabler/icons-svelte` v2 -> v3, which was the dependency actually blocking it.
2. **Replacing `@svelte-plugins/tooltips`** and **eslint-plugin-svelte 2 -> 3**
   (11 -> 9). The tooltips package was unmaintained and had no `svelte` export
   condition, so it was replaced with a local action; the Vite build warning it
   caused is gone.
3. **SvelteKit 3 and Vite 8** (9 -> 0). Cleared the Vite/esbuild dev-server
   advisories, the vite-plugin-svelte chain, the SvelteKit adapters, and the
   `cookie` advisory that came in through the framework.

## Verifying

```bash
npm audit
npm run check   # eslint + prettier + svelte-check + data validation
npm run build
```
