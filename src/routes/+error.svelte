<script lang="ts">
	import { page } from "$app/state";
	import Button from "../lib/components/Button.svelte";
</script>

<svelte:head>
	<title>{page.status} — Jikan</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="errorPage">
	<p class="errorPage__status">
		{page.status === 404 ? "not found" : "something went wrong"}
	</p>

	<h1>
		{page.status === 404 ? "This page does not exist" : "Jikan hit an unexpected error"}
	</h1>

	<p class="errorPage__detail">
		{page.status === 404
			? "The URL may be mistyped, or the page may have moved. The documentation is a good place to pick things back up."
			: "Try reloading the page. If the problem persists, the issue tracker is the fastest route to a fix."}
	</p>

	<nav class="errorPage__actions">
		<Button type="primary" url="/">Back to the homepage</Button>
		<Button type="secondary-outline" url="https://docs.api.jikan.moe/" urlTarget="_blank"
			>Read the docs</Button
		>
		<Button type="secondary-outline" url="/showcase">Browse the showcase</Button>
	</nav>
</section>

<style lang="scss">
	.errorPage {
		max-width: 560px;
		margin: 0 auto;
		padding: 96px 24px;
		text-align: center;

		&__status {
			display: inline-block;
			margin: 0 0 24px;
			padding: 8px 16px;
			border: 1px solid var(--background-300);
			border-radius: var(--border-radius-large);
			background: var(--background-100);
			color: var(--typography-300);
			font-family: "IBM Plex Mono", monospace;
			font-size: 14px;
		}

		h1 {
			margin: 0 0 12px;
			font-family: "IBM Plex Mono", monospace;
			font-size: 34px;
			line-height: 1.2;
		}

		&__detail {
			margin: 0 0 32px;
			color: var(--typography-400);
			line-height: 1.6;
		}

		&__actions {
			display: flex;
			flex-wrap: wrap;
			gap: 12px;
			justify-content: center;
		}
	}
</style>
