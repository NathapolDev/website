import { resolve } from "$app/paths";

/**
 * Builds an href from a value that may be either an internal route or an
 * external URL.
 *
 * SvelteKit 3's resolve() is the right way to build internal links: it applies
 * any configured `base` path, so links keep working when the site is not served
 * from the root. It must not be used for external URLs though - it would return
 * something like "/https://github.com/..." - so anything that is not a root-
 * relative path is passed through untouched.
 *
 * Most of the components in this project take a `url` prop that the caller may
 * point at either, which is why this exists rather than calling resolve()
 * directly at each site.
 */
export function href(url: string | null | undefined): string | null | undefined {
	if (typeof url !== "string" || !url.startsWith("/")) return url;

	// Kit 3 types resolve() against the routes it knows about, but this helper
	// receives a value from a prop and cannot narrow it. The runtime handles any
	// path; only the type is restricted, so the cast is confined to one line.
	return resolve(url as "/" | "/showcase" | `/#${string}`);
}
