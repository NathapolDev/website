<script lang="ts">
	import { tooltip } from "@svelte-plugins/tooltips";
	export let description: string | null = null;
	export let url: string | null = null;
	export let urlTarget: "_self" | "_blank" | "_parent" | "_top" = "_self";
	export let disabled = false;
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
		<slot />
	</a>
{:else}
	<a href={url} class="infoDisplay">
		<slot />
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
