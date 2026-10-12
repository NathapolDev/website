/**
 * Snapshot shipped with the repository, used by scripts/fetch-anime.mjs when
 * api.jikan.moe cannot be reached during a build.
 *
 * The values are shaped exactly like a /v4/top/anime response so the build
 * script can consume them without branching. Image URLs point at the public
 * Jikan CDN; they are replaced by live data on any build where the API answers.
 */
export interface AnimeEntry {
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

export const fallbackEntries: AnimeEntry[] = [
	{
		mal_id: 52991,
		status: "Finished Airing",
		title: "Sousou no Frieren",
		imageUrl: "https://cdn.myanimelist.net/images/anime/4/52991.jpg",
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
		imageUrl: "https://cdn.myanimelist.net/images/anime/6/51179.jpg",
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
		imageUrl: "https://cdn.myanimelist.net/images/anime/8/57334.jpg",
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
		imageUrl: "https://cdn.myanimelist.net/images/anime/6/49387.jpg",
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
		imageUrl: "https://cdn.myanimelist.net/images/anime/6/21.jpg",
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
		imageUrl: "https://cdn.myanimelist.net/images/anime/9/20.jpg",
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
