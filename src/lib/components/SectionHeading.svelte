<script lang="ts">
	import type { Snippet } from "svelte";

	/**
	 * A section's heading and optional supporting line.
	 *
	 * This wrapper appeared seven times across the home page sections, each copy
	 * re-declaring the same .type--group-heading-and-content class and the same
	 * heading/support pairing.
	 *
	 * Both parts are snippets rather than strings because the real headings are
	 * not uniform text: the hero's subtitle embeds a <strong>, and one Features
	 * heading embeds a <Button>. `level` and `subtitleTag` exist because the page
	 * genuinely mixes h1/h2 for the heading and p/h3/h6 for the supporting line -
	 * without them, promoting the common case would have silently changed the
	 * heading level on the others.
	 *
	 * The optional `centered` flag replaces an extra `type--center` class on the
	 * same element.
	 */
	let {
		level = 2,
		subtitleTag = "p",
		subtitleClass = "",
		centered = false,
		title,
		subtitle
	}: {
		level?: 1 | 2 | 3 | 4 | 5 | 6;
		subtitleTag?: "p" | "h3" | "h6";
		subtitleClass?: string;
		centered?: boolean;
		title: Snippet;
		subtitle?: Snippet;
	} = $props();
</script>

<div class="type--group-heading-and-content" class:type--center={centered}>
	<svelte:element this={"h" + level}>{@render title()}</svelte:element>
	{#if subtitle}
		<svelte:element this={subtitleTag} class={subtitleClass}
			>{@render subtitle()}</svelte:element
		>
	{/if}
</div>
