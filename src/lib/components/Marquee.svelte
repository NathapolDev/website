<script lang="ts">
	import JetbrainsLogo from "../images/jetbrains.svg";
	import Divider from "./Divider.svelte";
	import { onMount } from "svelte";
	import supporters from "../../data/supporters";

	// $state() holds undefined until the element binds during mount.
	let track = $state<HTMLDivElement>();

	onMount(() => {
		if (!track) return;

		// Duplicate the track once. The CSS animation translates the track by
		// exactly -50%, i.e. one full copy, so the loop is seamless.
		track.insertAdjacentHTML("beforeend", track.innerHTML);
	});
</script>

<footer class="shoutouts">
	<div class="marquee" bind:this={track}>
		{#if supporters.sugoi_supporter.length > 0}
			<p>Sugoi Supporters</p>
		{/if}
		{#each supporters.sugoi_supporter.sort() as supporter (supporter)}
			<code>{supporter}</code>
		{/each}
		<Divider type="circle" />

		{#if supporters.supporter.length > 0}
			<p>Supporters</p>
		{/if}
		{#each supporters.supporter.sort() as supporter (supporter)}
			<code>{supporter}</code>
		{/each}
		<Divider type="circle" />

		{#if supporters.supporter.length > 0}
			<p>Jikan's development is powered by</p>
		{/if}
		{#each supporters.powered_by as poweredBy (poweredBy.name)}
			<a href={poweredBy.url} target="_blank">
				<img src={JetbrainsLogo} height={35} width={35} alt={poweredBy.name} />
				<code>{poweredBy.name}</code>
			</a>
		{/each}
		<Divider type="circle" />
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
