<script lang="ts">
	import { IconArrowDownLeft } from "@tabler/icons-svelte";
	interface Props {
		type?: "primary" | "info" | "warning" | "patreon";
		showIcon?: boolean;
		url?: string;
		children?: import("svelte").Snippet;
	}

	let { type = "primary", showIcon = true, url = "#", children }: Props = $props();
</script>

<a href={url} target="_blank" class="bannerInline bannerInline--type-{type}">
	{@render children?.()}
	{#if showIcon}
		<IconArrowDownLeft class="external-link" size={20} stroke={1.5} />
	{/if}
</a>

<style lang="scss">
	.bannerInline {
		display: inline-flex;
		padding: 8px 16px;
		align-items: center;
		gap: 8px;
		max-width: fit-content;
	}

	.bannerInline--type-patreon {
		background:
			linear-gradient(var(--background-100), var(--background-100)) padding-box,
			linear-gradient(
					to right,
					var(--border-patreon-gradient-color-start),
					var(--border-patreon-gradient-color-stop)
				)
				border-box;
		border-radius: var(--border-radius-small);
		border: 1px solid transparent;
	}
</style>
