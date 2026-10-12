<script lang="ts">
	import AnimeCardCover from "./anime/AnimeCardCover.svelte";
	import AnimeCardGenres from "./anime/AnimeCardGenres.svelte";
	import AnimeCardMeta from "./anime/AnimeCardMeta.svelte";
	import AnimeCardRating from "./anime/AnimeCardRating.svelte";
	import tilt from "./tilt";

	export let mal_id: number = 0;
	export let imageUrl: string = "";
	export let rating: string | null = "";
	export let score: number | null = 0;
	export let scoredBy: number | null = 0;
	export let title: string = "";
	export let season: string | number | null = 0;
	export let year: number | null = 0;
	export let genres: { name: string }[] = [];
	export let status: string = "";
	export let episodes: number | null = 0;
	export let rank: number | null = 0;
	export let skeleton: boolean = false;
	export let cardExit: boolean = false;

	const STATUS_CLASSES: Record<string, string> = {
		"Finished Airing": "animeStatus-finished",
		"Not yet aired": "animeStatus-upcoming",
		"Currently Airing": "animeStatus-airing"
	};

	// Derived from a prop, so this has to stay reactive: the previous onMount
	// version only ever computed once and ignored later updates to `status`.
	$: statusClass = STATUS_CLASSES[status] ?? status;
	$: isCardTransitioning = cardExit ? "cardAnime--exit" : "";
</script>

{#if skeleton}
	<div class="cardAnime cardAnime--skeleton {isCardTransitioning}"></div>
{:else}
	<a
		href="https://api.jikan.moe/v4/anime/{mal_id}"
		class="cardAnime {isCardTransitioning}"
		target="_blank"
		use:tilt={{ scale: 1, reverse: true }}
	>
		<AnimeCardCover {imageUrl} {title} {rating} />
		<div class="cardAnime__body">
			<AnimeCardMeta {statusClass} {status} {season} {year} {episodes} />
			<p class="cardAnime__title">{title}</p>
			<AnimeCardRating {score} {scoredBy} {rank} />
			<AnimeCardGenres {genres} />
		</div>
	</a>
{/if}
