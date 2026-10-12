<script lang="ts">
	import JetbrainsLogo from "../images/jetbrains.svg";
	import Divider from "./Divider.svelte";
	import supporters from "../../data/supporters";

	// Sorted copies. Calling .sort() inline sorted the imported module's arrays
	// in place and re-ran the comparison on every render.
	const sugoiSupporters = [...supporters.sugoi_supporter].sort();
	const backers = [...supporters.supporter].sort();
</script>

<footer class="shoutouts">
	<div class="marquee">
		// The strip is rendered twice and the CSS animation translates the track by // exactly
		-50%, i.e. one copy, so the loop is seamless. It used to clone the // track with
		insertAdjacentHTML, which manipulates the DOM behind Svelte's // back and can desync if
		Svelte ever re-renders that subtree.
		{#snippet strip()}
			{#if supporters.sugoi_supporter.length > 0}
				<p>Sugoi Supporters</p>
			{/if}
			{#each sugoiSupporters as supporter (supporter)}
				<code>{supporter}</code>
			{/each}
			<Divider type="circle" />

			{#if supporters.supporter.length > 0}
				<p>Supporters</p>
			{/if}
			{#each backers as supporter (supporter)}
				<code>{supporter}</code>
			{/each}
			<Divider type="circle" />

			{#if supporters.powered_by.length > 0}
				<p>Jikan's development is powered by</p>
			{/if}
			{#each supporters.powered_by as poweredBy (poweredBy.name)}
				<a href={poweredBy.url} target="_blank">
					<img src={JetbrainsLogo} height={35} width={35} alt={poweredBy.name} />
					<code>{poweredBy.name}</code>
				</a>
			{/each}
			<Divider type="circle" />
		{/snippet}

		{@render strip()}
		{@render strip()}
	</div>
</footer>

<style lang="scss">
	.shoutouts {
		display: flex;
		overflow: hidden;
		z-index: 10;
		height: 60px;
		gap: 32px;
		background: var(--background-000);

		& > * {
			user-select: none;
			-webkit-user-drag: none;
		}

		.marquee {
			display: flex;
			align-items: center;
			gap: 32px;
			flex: 0 0 auto;
			width: max-content;
			animation: marquee-scroll 45s linear infinite;

			p {
				color: var(--typography-400);
				white-space: nowrap;
				overflow: visible;
			}

			a {
				display: flex;
				align-items: center;
				gap: 16px;
				white-space: nowrap;
				overflow: visible;
			}

			code {
				white-space: nowrap;
				overflow: visible;
			}
		}
	}

	@keyframes marquee-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	// Respect users who ask for reduced motion: stop the scroll and let the
	// row be panned manually instead.
	@media (prefers-reduced-motion: reduce) {
		.shoutouts {
			overflow-x: auto;
		}

		.marquee {
			animation: none;
		}
	}
</style>
