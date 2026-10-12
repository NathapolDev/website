<script>
	import AnimeCardCover from "./anime/AnimeCardCover.svelte";
	import AnimeCardGenres from "./anime/AnimeCardGenres.svelte";
	import AnimeCardMeta from "./anime/AnimeCardMeta.svelte";
	import AnimeCardRating from "./anime/AnimeCardRating.svelte";
	import tilt from "./tilt.js";

	export let mal_id = 0;
	export let imageUrl = "";
	export let rating = "";
	export let score = 0;
	export let scoredBy = 0;
	export let title = "";
	export let season = 0;
	export let year = 0;
	export let genres = [];
	export let status = "";
	export let episodes = 0;
	export let rank = 0;
	export let skeleton = false;
	export let cardExit = false;

	const STATUS_CLASSES = {
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
