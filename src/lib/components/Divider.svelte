<script lang="ts">
	interface Props {
		type?: string;
	}

	let { type = "circle" }: Props = $props();
</script>

<div class="divider divider--type-{type}"></div>

<style lang="scss">
	.divider {
		display: block;
		&--type-circle {
			width: 4px;
			height: 4px;
			border-radius: 100px;
			background: var(--background-500);
		}

		&--type-line {
			width: 100%;
			height: 0.5px;
			background: var(--background-300);
		}
	}
</style>
