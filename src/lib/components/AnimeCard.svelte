<script lang="ts">
	import AnimeCardCover from "./anime/AnimeCardCover.svelte";
	import AnimeCardGenres from "./anime/AnimeCardGenres.svelte";
	import AnimeCardMeta from "./anime/AnimeCardMeta.svelte";
	import AnimeCardRating from "./anime/AnimeCardRating.svelte";
	import tilt from "./tilt";

	interface Props {
		mal_id?: number;
		imageUrl?: string;
		rating?: string | null;
		score?: number | null;
		scoredBy?: number | null;
		title?: string;
		season?: string | number | null;
		year?: number | null;
		genres?: { name: string }[];
		status?: string;
		episodes?: number | null;
		rank?: number | null;
		skeleton?: boolean;
		cardExit?: boolean;
	}

	let {
		mal_id = 0,
		imageUrl = "",
		rating = "",
		score = 0,
		scoredBy = 0,
		title = "",
		season = 0,
		year = 0,
		genres = [],
		status = "",
		episodes = 0,
		rank = 0,
		skeleton = false,
		cardExit = false
	}: Props = $props();

	const STATUS_CLASSES: Record<string, string> = {
		"Finished Airing": "animeStatus-finished",
		"Not yet aired": "animeStatus-upcoming",
		"Currently Airing": "animeStatus-airing"
	};

	// Derived from a prop, so this has to stay reactive: the previous onMount
	// version only ever computed once and ignored later updates to `status`.
	let statusClass = $derived(STATUS_CLASSES[status] ?? status);
	let isCardTransitioning = $derived(cardExit ? "cardAnime--exit" : "");
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
