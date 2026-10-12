<script>
	// Global styles are imported from the script block rather than a
	// <style> block so Vite handles the Sass compilation and injects the
	// result globally. normalize.css is plain CSS and is loaded the same way.
	import 'normalize.css';
	import './scss/bootstrap.scss';
</script>

<div class="app">
<!--	<Header />-->

	<main>
		<slot />
	</main>

</div>
