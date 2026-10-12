<script lang="ts">
	import type { Snippet } from "svelte";

	/** Short label for what failed, e.g. "the integrations list". */
	let { label, children }: { label: string; children?: Snippet } = $props();

	// Svelte hands the boundary an unknown, so narrow it rather than assuming.
	function describe(error: unknown): string {
		if (error instanceof Error) return error.message;
		if (typeof error === "string") return error;
		return "Unknown error";
	}
</script>

<!--
	Keeps one failing section from taking down the whole page. SvelteKit's
	+error.svelte only catches routing and load failures, so an error thrown
	while a component is rendering (a bad data shape, for instance) would
	otherwise blank everything.
-->
<svelte:boundary>
	{@render children?.()}

	{#snippet failed(error: unknown, reset)}
		<div class="sectionFallback" role="status">
			<p class="sectionFallback__label">{label} could not be displayed.</p>
			<button type="button" class="sectionFallback__retry" onclick={reset}>Try again</button>
			<!-- Surface the message rather than swallowing it; it is useful in dev
			     and harmless in production, where the detail is generic. -->
			<p class="sectionFallback__detail">{describe(error)}</p>
		</div>
	{/snippet}
</svelte:boundary>

<style lang="scss">
	.sectionFallback {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		max-width: 520px;
		margin: 0 auto;
		padding: 48px 24px;
		border: 1px solid var(--background-300);
		border-radius: var(--border-radius-large);
		background: var(--background-100);
		text-align: center;

		&__label {
			margin: 0;
			color: var(--typography-100);
			font-size: 14px;
		}

		&__retry {
			padding: 8px 16px;
			border: 1px solid var(--background-300);
			border-radius: var(--border-radius-small);
			background: var(--primary-500);
			color: #fff;
			font-size: 13px;
			cursor: pointer;

			&:hover {
				background: var(--primary-400);
			}

			&:focus-visible {
				outline: 2px solid var(--primary-400);
				outline-offset: 2px;
			}
		}

		&__detail {
			margin: 0;
			color: var(--typography-400);
			font-size: 12px;
		}
	}
</style>
