<script lang="ts">
	import { onMount } from "svelte";
	import { IconSun, IconMoon } from "@tabler/icons-svelte";
	import { theme } from "../stores/theme.svelte";

	// localStorage is the source of truth, but the inline script in app.html has
	// already applied it to <html>. Sync the store once so the icon is right.
	onMount(() => theme.init());
</script>

<button
	type="button"
	class="themeToggle"
	onclick={() => theme.toggle()}
	aria-label={theme.resolved === "dark" ? "Switch to light theme" : "Switch to dark theme"}
	title={theme.resolved === "dark" ? "Switch to light theme" : "Switch to dark theme"}
>
	{#if theme.resolved === "dark"}
		<IconSun size={20} stroke={1.5} />
	{:else}
		<IconMoon size={20} stroke={1.5} />
	{/if}
</button>

<style lang="scss">
	.themeToggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		border: 1px solid var(--background-300);
		border-radius: var(--border-radius-large);
		background: var(--background-100);
		color: var(--typography-100);
		cursor: pointer;
		transition:
			background 0.2s ease,
			border-color 0.2s ease;

		&:hover {
			border-color: var(--primary-400);
			background: var(--background-200);
		}

		&:focus-visible {
			outline: 2px solid var(--primary-400);
			outline-offset: 2px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.themeToggle {
			transition: none;
		}
	}
</style>
