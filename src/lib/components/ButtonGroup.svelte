<script lang="ts">
	interface Props {
		type?: string;
		children?: import("svelte").Snippet;
	}

	let { type = "horizontal", children }: Props = $props();
</script>

<div class="buttonGroup buttonGroup--type-{type}">
	{@render children?.()}
</div>

<style lang="scss">
	.buttonGroup {
		display: flex;
		align-items: flex-start;
		gap: 16px;

		&--type-stacked {
			flex-direction: column;
			width: 100%;
		}
	}

	@media screen and (max-width: 700px) {
		.buttonGroup {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 16px;

			&--type-stacked {
				flex-direction: column;
				width: 100%;
			}
		}
	}
</style>
