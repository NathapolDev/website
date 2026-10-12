<script lang="ts">
	import { tooltip } from "@svelte-plugins/tooltips";
	interface Props {
		description?: string | null;
		url?: string | null;
		urlTarget?: "_self" | "_blank" | "_parent" | "_top";
		disabled?: boolean;
		children?: import("svelte").Snippet;
	}

	let {
		description = null,
		url = null,
		urlTarget = "_self",
		disabled = false,
		children
	}: Props = $props();
</script>

{#if description !== null}
	<a
		href={url}
		target={urlTarget}
		class="infoDisplay"
		class:disabled
		use:tooltip={{
			content: description,
			animation: "slide"
		}}
	>
		{@render children?.()}
	</a>
{:else}
	<a href={url} class="infoDisplay">
		{@render children?.()}
	</a>
{/if}

<style lang="scss">
	.infoDisplay {
		display: inline-flex;
		padding: 8px;
		align-items: center;
		gap: 8px;
		border-radius: 8px;
		border: 1px solid var(--background-400);
		color: var(--typography-100);

		&.disabled {
			border: 1px solid var(--background-400);
			color: var(--typography-400);
		}
	}
</style>
