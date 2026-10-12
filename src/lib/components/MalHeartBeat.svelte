<script lang="ts">
	import { tooltip } from "@svelte-plugins/tooltips";
	import { IconHelp } from "@tabler/icons-svelte";
	import { onMount } from "svelte";

	let health = $state("healthy");

	onMount(() => {
		fetch("https://api.jikan.moe/v4")
			.then((data) => data.json())
			.then((data) => {
				health = data.myanimelist_heartbeat.status.toLowerCase();
			});
	});
</script>

<div class="heartbeat">
	<p>
		<span
			use:tooltip={{
				content:
					"MAL Heartbeat monitors connections between the Jikan REST API and MyAnimeList.net. Requests to MyAnimeList.net that fail contribute towards a negative health event.",
				animation: "slide"
			}}><IconHelp size={20} stroke={1.5} class="heartbeat__helpIcon" /></span
		>
		<strong>MAL HeartBeat</strong>
	</p>

	<small
		>Heartbeat is <span class="heartbeat__health heartbeat__health--{health}">{health}</span
		></small
	>
	<!--    <small>Last event occurred-->
	<!--        <span class="heartbeat__event">{formatRelative(subDays(new Date(), new Date(lastEvent*1000)), new Date())}</span>-->
	<!--    </small>-->
</div>

<style lang="scss">
	:global(.heartbeat__helpIcon) {
		margin-top: 6px;
	}

	.heartbeat {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 16px;
		gap: 8px;

		width: 230px;
		min-width: 200px;
		max-width: 250px;

		background: var(--background-200);
		border: 1px solid var(--background-400);
		border-radius: var(--border-radius-large);

		p {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0;
			gap: 8px;
			color: var(--typography-100);
		}

		&__health {
			text-transform: capitalize;

			&--healthy {
				color: rgba(0, 255, 41, 1);
			}
		}
	}
</style>
