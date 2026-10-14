/**
 * The demo cards shown in the hero.
 *
 * These used to be fetched from api.jikan.moe at build time by
 * scripts/fetch-anime.mjs. The public API is discontinued, and fetching at build
 * time meant the page silently degraded to whatever snapshot was committed
 * whenever the API was unreachable - which is most of the time.
 *
 * Since the hero is demonstrating what a Jikan response looks like rather than
 * reporting live data, the values are hardcoded. They are shaped exactly like a
 * /v4/top/anime row so the demo still reads as a real API response, and the
 * titles/scores are real MyAnimeList entries.
 *
 * Covers are local placeholders in static/placeholders/ rather than
 * cdn.myanimelist.net URLs, so they always load and never depend on a third party.
 */

export interface HeroAnime {
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

export const heroAnime: HeroAnime[] = [
	{
		mal_id: 52991,
		status: "Finished Airing",
		title: "Sousou no Frieren",
		imageUrl: "/placeholders/frieren.svg",
		rating: "PG-13",
		score: 9.22,
		scoredBy: 900000,
		season: "fall",
		year: 2023,
		episodes: 28,
		rank: 8,
		genres: [{ name: "Adventure" }, { name: "Drama" }, { name: "Fantasy" }]
	},
	{
		mal_id: 51179,
		status: "Finished Airing",
		title: "Houkago Teibou Nisshi",
		imageUrl: "/placeholders/teibou.svg",
		rating: "TV-14",
		score: 7.72,
		scoredBy: 120000,
		season: "spring",
		year: 2021,
		episodes: 12,
		rank: 203,
		genres: [{ name: "Slice of Life" }, { name: "Comedy" }]
	},
	{
		mal_id: 57334,
		status: "Finished Airing",
		title: "Kusuriya no Hitorigoto",
		imageUrl: "/placeholders/kusuriya.svg",
		rating: "R",
		score: 8.42,
		scoredBy: 350000,
		season: "fall",
		year: 2023,
		episodes: 12,
		rank: 44,
		genres: [{ name: "Mystery" }, { name: "Psychological" }]
	},
	{
		mal_id: 49387,
		status: "Finished Airing",
		title: "Vinland Saga Season 2",
		imageUrl: "/placeholders/vinland.svg",
		rating: "R",
		score: 9.05,
		scoredBy: 480000,
		season: "summer",
		year: 2023,
		episodes: 24,
		rank: 21,
		genres: [{ name: "Action" }, { name: "Adventure" }]
	},
	{
		mal_id: 21,
		status: "Finished Airing",
		title: "One Piece",
		imageUrl: "/placeholders/onepiece.svg",
		rating: "PG-13",
		score: 8.72,
		scoredBy: 140000,
		season: "fall",
		year: 1999,
		episodes: null,
		rank: 10,
		genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Comedy" }]
	},
	{
		mal_id: 20,
		status: "Currently Airing",
		title: "Naruto",
		imageUrl: "/placeholders/naruto.svg",
		rating: "PG-13",
		score: 8.0,
		scoredBy: 170000,
		season: "fall",
		year: 2002,
		episodes: null,
		rank: 16,
		genres: [{ name: "Action" }, { name: "Adventure" }]
	}
];
