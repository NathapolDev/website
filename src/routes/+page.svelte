<script lang="ts">
	import Nav from "../lib/components/Nav.svelte";
	import Footer from "../lib/components/Footer.svelte";
	import Hero from "../lib/components/sections/Hero.svelte";
	import Features from "../lib/components/sections/Features.svelte";
	import HowItWorks from "../lib/components/sections/HowItWorks.svelte";
	import Integrations from "../lib/components/sections/Integrations.svelte";
	import type { GithubData } from "../lib/types/github";

	// Repository stats and contributors are fetched at build time by
	// scripts/fetch-github.mjs, so the page no longer makes three unauthenticated
	// GitHub API calls per visitor (see the script for why that used to break).
	import githubData from "../data/generated/github.json";

	const github = githubData as GithubData;
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
	<!-- Browser chrome follows the active theme. -->
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f1115" />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#eef1f6" />
</svelte:head>

<Nav />

<Hero />
<Features />
<HowItWorks {github} />
<Integrations />

<Footer />
