<script lang="ts">
	import Nav from "../lib/components/Nav.svelte";
	import Footer from "../lib/components/Footer.svelte";
	import Hero from "../lib/components/sections/Hero.svelte";
	import Features from "../lib/components/sections/Features.svelte";
	import HowItWorks from "../lib/components/sections/HowItWorks.svelte";
	import Integrations from "../lib/components/sections/Integrations.svelte";
	import { onMount } from "svelte";

	type GithubRepo = { stargazers_count: number; forks_count: number };
	type GithubContributor = { login: string; avatar_url: string; html_url: string };
	type GithubData = {
		jikan?: GithubRepo;
		jikan_rest?: GithubRepo;
		contributors?: GithubContributor[];
	};
	let github: GithubData = {};
	onMount(async () => {
		github.jikan = await (await fetch("https://api.github.com/repos/jikan-me/jikan")).json();
		github.jikan_rest = await (
			await fetch("https://api.github.com/repos/jikan-me/jikan-rest")
		).json();
		github.contributors = await (
			await fetch("https://api.github.com/repos/jikan-me/jikan/contributors")
		).json();
	});
</script>

<svelte:head>
	<title>Jikan - Unofficial MyAnimeList API</title>

	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

	<!-- SEO/OGP -->
	<meta name="author" content="@irfanDahir" />
	<meta
		name="keywords"
		content="jikan, anime, rest, php, api, myanimelist, free, open, source, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, manga, people, characters, novels, manhua, manhwa, wrapper, ruby, python, restful, dart, node, javascript, js, nodejs, java, net"
	/>
	<meta name="description" content="Jikan is an unofficial MyAnimeList REST based API" />
	<meta name="image" content="https://i.imgur.com/eUveNoj.png" />
	<meta itemprop="name" content="Jikan - Unofficial MyAnimeList API" />
	<meta itemprop="description" content="Jikan is an unofficial MyAnimeList REST based API" />
	<meta itemprop="image" content="https://i.imgur.com/eUveNoj.png" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Jikan - Unofficial MyAnimeList API" />
	<meta name="twitter:description" content="Jikan is an unofficial MyAnimeList REST based API" />
	<meta name="twitter:creator" content="@irfanDahir" />
	<meta name="twitter:site" content="@irfanDahir" />
	<meta name="twitter:image:src" content="https://i.imgur.com/eUveNoj.png" />
	<meta name="twitter:image:alt" content="Jikan.moe brand image" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="og:title" content="Jikan - Unofficial MyAnimeList API" />
	<meta name="og:description" content="Jikan is an unofficial MyAnimeList REST based API" />
	<meta name="og:image" content="https://i.imgur.com/eUveNoj.png" />
	<meta name="og:url" content="https://jikan.moe" />
	<meta name="og:site_name" content="Jikan - Unofficial MyAnimeList API" />
	<meta name="og:locale" content="en_US" />
	<meta name="og:type" content="website" />

	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<Nav />

<Hero />
<Features />
<HowItWorks {github} />
<Integrations />

<Footer />
