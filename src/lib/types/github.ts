/** Shape of the repository stats rendered on the home page. */
export type GithubRepo = {
	stargazers_count: number;
	forks_count: number;
};

/** A single contributor avatar entry. */
export type GithubContributor = {
	login: string;
	avatar_url: string;
	html_url: string;
};

/**
 * Payload written by scripts/fetch-github.mjs at build time.
 * Every field is always present: the script writes an empty-but-valid object
 * rather than failing the build when the GitHub API is unreachable.
 */
export type GithubData = {
	generatedAt: string | null;
	jikan: GithubRepo;
	jikan_rest: GithubRepo;
	contributors: GithubContributor[];
};
