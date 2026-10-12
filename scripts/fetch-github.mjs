#!/usr/bin/env node
/**
 * Fetches the GitHub stats shown on the home page and writes them to
 * src/data/generated/github.json at build time.
 *
 * This used to happen in the browser via onMount, which meant every visitor
 * triggered three unauthenticated GitHub API calls. That is fragile: the
 * unauthenticated limit is 60 requests/hour per IP, and once it is exhausted
 * the API returns a 403 JSON object. `{#if github.contributors}` is truthy for
 * that object, so `github.contributors.slice(...)` threw and took the page down
 * with it.
 *
 * A failure here must never break the build (Netlify builds can run without
 * network access), so errors are reported and an empty-but-valid payload is
 * written instead.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "src/data/generated/github.json");

const ENDPOINTS = {
	jikan: "https://api.github.com/repos/jikan-me/jikan",
	jikan_rest: "https://api.github.com/repos/jikan-me/jikan-rest",
	contributors: "https://api.github.com/repos/jikan-me/jikan/contributors"
};

const EMPTY = {
	generatedAt: null,
	jikan: { stargazers_count: 0, forks_count: 0 },
	jikan_rest: { stargazers_count: 0, forks_count: 0 },
	contributors: []
};

async function getJson(url) {
	const res = await fetch(url, {
		headers: {
			Accept: "application/vnd.github+json",
			"User-Agent": "jikan-website-build"
		},
		// Fail fast rather than hanging a build.
		signal: AbortSignal.timeout(10000)
	});
	if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
	return res.json();
}

function pickRepoStats(data) {
	return {
		stargazers_count: Number(data?.stargazers_count ?? 0),
		forks_count: Number(data?.forks_count ?? 0)
	};
}

function pickContributor(c) {
	return {
		login: String(c?.login ?? ""),
		avatar_url: String(c?.avatar_url ?? ""),
		html_url: String(c?.html_url ?? "")
	};
}

const payload = { ...EMPTY, generatedAt: new Date().toISOString() };
const warnings = [];

const [jikan, jikanRest, contributors] = await Promise.all(
	Object.values(ENDPOINTS).map(async (url) => {
		try {
			return await getJson(url);
		} catch (err) {
			warnings.push(String(err.message ?? err));
			return null;
		}
	})
);

if (jikan) payload.jikan = pickRepoStats(jikan);
if (jikanRest) payload.jikan_rest = pickRepoStats(jikanRest);
if (Array.isArray(contributors)) {
	payload.contributors = contributors.map(pickContributor).filter((c) => c.login);
}

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(payload, null, "\t") + "\n");

const stars = (payload.jikan.stargazers_count ?? 0) + (payload.jikan_rest.stargazers_count ?? 0);
console.log(
	`fetch-github: ${payload.contributors.length} contributors, ${stars} stars -> ${OUT.replace(ROOT + "/", "")}`
);
if (warnings.length > 0) {
	console.warn("fetch-github: continuing with empty values for the failed endpoints:");
	for (const w of warnings) console.warn("  " + w);
}
