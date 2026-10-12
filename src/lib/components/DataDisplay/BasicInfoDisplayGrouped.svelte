<script lang="ts">
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="infoDisplayGroup">
	{@render children?.()}
</div>

<style lang="scss">
	.infoDisplayGroup {
		display: flex;
		align-items: flex-start;
		align-content: flex-start;
		gap: 8px;
		align-self: stretch;
		flex-wrap: wrap;
		user-select: none;
		-webkit-user-drag: none;
	}
</style>
