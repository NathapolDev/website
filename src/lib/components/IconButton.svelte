<script lang="ts">
	import type { Snippet } from "svelte";
	import Button from "./Button.svelte";

	/**
	 * A single icon-only control.
	 *
	 * The nav rendered three of these by hand, each repeating
	 * `type="nav-icon-link" size="small" urlTarget="_blank"` plus the same
	 * class-name structure. This is the one definition.
	 *
	 * `url` and `callback` are mutually exclusive: with a url it navigates,
	 * without one it acts on the page. Button decides which element to render.
	 * `label` is required and is what assistive tech announces, since the control
	 * has no visible text.
	 */
	let {
		url = null,
		urlTarget = "_blank",
		callback = null,
		label,
		children
	}: {
		url?: string | null;
		urlTarget?: "_self" | "_blank" | "_parent" | "_top";
		callback?: (() => void) | null;
		label: string;
		children: Snippet;
	} = $props();
</script>

<Button type="nav-icon-link" size="small" {url} {urlTarget} {callback} aria-label={label}>
	{@render children()}
</Button>
