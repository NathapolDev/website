<script lang="ts">
	import Typewriter from "svelte-typewriter";
	import Chip from "./Chip.svelte";
	import AnimeCard from "./AnimeCard.svelte";
	import { onMount } from "svelte";
	import math from "../helpers/math";
	import funcs from "../helpers/funcs";
	import { fly } from "svelte/transition";

	/** How long a result set stays on screen before rotating to the next URL. */
	const ROTATE_MS = 10000;

	// Anime is captured at build time by scripts/fetch-anime.mjs rather than
	// fetched from api.jikan.moe in the browser. That request used to hang
	// whenever the API was unreachable, leaving skeletons on screen forever.
	import anime from "../../data/generated/anime.json";

	let requests = $state([
		"https://api.jikan.moe/v4/anime?q=bleach&sfw",
		"https://api.jikan.moe/v4/anime?q=%E6%96%B0%E4%B8%96%E7%B4%80&sfw",
		"https://api.jikan.moe/v4/seasons/now?sfw",
		"https://api.jikan.moe/v4/top/anime?sfw",
		"https://api.jikan.moe/v4/seasons/upcoming",
		"https://api.jikan.moe/v4/top/anime?type=movie",
		"https://api.jikan.moe/v4/top/anime?type=ova",
		"https://api.jikan.moe/v4/top/anime?type=ona"
	]);

	let requestIndex = $state(0);
	// Derived from requestIndex rather than assigned to: $derived is a
	// declaration, not a variable to write to. This previously derived from
	// requests[0] and was then reassigned, so requestIndex was never used.
	let requestUrl = $derived(requests[requestIndex]);

	let rotateTimer: ReturnType<typeof setInterval> | null = null;

	/** Rows of /v4/top/anime, as consumed by AnimeCard. */
	interface AnimeEntry {
		mal_id: number;
		status: string;
		title: string;
		imageUrl: string;
		rating: string | null;
		score: number | null;
		scoredBy: number | null;
		season: string | null;
		year: number | null;
		episodes: number | null;
		rank: number | null;
		genres: { name: string }[];
	}

	let entries = $state<AnimeEntry[]>(anime.entries);
	let showCards = $derived(entries.length > 0);
	let isCardTransitioning = $state(false);
	// Measured when the data was captured, so the figure is honest about being
	// build-time rather than pretending to be a live round trip.
	let requestDuration = $derived(anime.durationMs);
	let showDuration = $state(false);

	onMount(() => {
		// A few random historical seasons, plus today's schedule.
		for (let i = 0; i <= math.randomInteger(2, 4); i++) {
			const randomYear = math.randomInteger(2005, new Date().getFullYear() - 1);
			const seasons = ["spring", "summer", "fall", "winter"];
			requests.push(
				`https://api.jikan.moe/v4/seasons/${randomYear}/${seasons[math.randomInteger(0, 3)]}?sfw`
			);
		}
		const today = new Date().toLocaleString("en-us", { weekday: "long" }).toLowerCase();
		requests.push(`https://api.jikan.moe/v4/schedules/${today}?sfw`);

		requests = funcs.shuffle(requests);
		showDuration = true;

		// The rotation timer outlives several typewriter cycles, so it has to be
		// cleared when the component goes away rather than left running.
		rotateTimer = setInterval(() => {
			requestIndex = (requestIndex + 1) % requests.length;
		}, ROTATE_MS);

		return () => {
			if (rotateTimer !== null) clearInterval(rotateTimer);
		};
	});
</script>

<div class="request">
	<Chip type="request" size="small">GET</Chip>
	<!-- svelte-typewriter captures its text on mount, so changing requestUrl
	     alone would leave the old URL on screen. {#key} remounts it instead. -->
	{#key requestUrl}
		<Typewriter mode="loopOnce" keepCursorOnFinish={true} interval={20} unwriteInterval={5}
			><a href={requestUrl} target="_blank"><code>{requestUrl}</code></a></Typewriter
		>
	{/key}
	{#if showDuration && requestDuration}
		<span transition:fly={{ delay: 0, duration: 150, x: -32 }} class="duration"
			>{requestDuration}ms</span
		>
	{/if}
</div>

<div class="cards">
	{#if !showCards}
		{#each { length: 6 } as _, i (i)}
			<AnimeCard skeleton cardExit={isCardTransitioning} />
		{/each}
	{/if}
	{#if showCards}
		{#each entries as entry (entry.mal_id)}
			<AnimeCard
				cardExit={isCardTransitioning}
				mal_id={entry.mal_id}
				status={entry.status}
				title={entry.title}
				imageUrl={entry.imageUrl}
				rating={entry.rating}
				score={entry.score}
				scoredBy={entry.scoredBy}
				season={entry.season}
				year={entry.year}
				episodes={entry.episodes}
				rank={entry.rank}
				genres={entry.genres}
			/>
		{/each}
	{/if}
</div>
