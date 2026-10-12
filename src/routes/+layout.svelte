<script lang="ts">
	// Global styles are imported from the script block rather than a
	// <style> block so Vite handles the Sass compilation and injects the
	// result globally. normalize.css is plain CSS and is loaded the same way.
	import "normalize.css";
	import "./scss/bootstrap.scss";
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="app">
	<!--	<Header />-->

	<main>
		{@render children?.()}
	</main>
</div>
