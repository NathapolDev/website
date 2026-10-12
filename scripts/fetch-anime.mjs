#!/usr/bin/env node
/**
 * Fetches the anime shown in the hero at build time and writes them to
 * src/data/generated/anime.json.
 *
 * This used to be a runtime fetch from api.jikan.moe in the browser. That made
 * every visitor depend on a third-party API being reachable, and when it was
 * not, the request would hang rather than reject - leaving the skeleton cards
 * on screen indefinitely and never rotating to the next URL.
 *
 * A build-time fetch is immune to that: whatever is captured ships with the
 * site. If the API cannot be reached, we fall back to the committed snapshot in
 * src/data/anime-fallback.ts so the layout still renders real cards rather than
 * an empty box. That fallback is never a build failure.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { fallbackEntries } from "../src/data/anime-fallback.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "src/data/generated/anime.json");

const SOURCE = "https://api.jikan.moe/v4/top/anime?sfw";
const WANT = 6;

const EMPTY = { fetchedAt: null, live: false, durationMs: null, entries: [] };

function pick(entry) {
	return {
		mal_id: entry?.mal_id,
		status: entry?.status ?? "",
		title: entry?.title ?? "",
		imageUrl: entry?.images?.jpg?.large_image_url ?? "",
		rating: entry?.rating ?? null,
		score: entry?.score ?? null,
		scoredBy: entry?.scored_by ?? null,
		season: entry?.season ?? null,
		year: entry?.year ?? null,
		episodes: entry?.episodes ?? null,
		rank: entry?.rank ?? null,
		genres: (entry?.genres ?? []).map((g) => ({ name: g?.name }))
	};
}

const payload = { ...EMPTY };
const warnings = [];

try {
	const started = Date.now();
	const res = await fetch(SOURCE, {
		headers: { Accept: "application/json", "User-Agent": "jikan-website-build" },
		signal: AbortSignal.timeout(15000)
	});
	if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

	const body = await res.json();
	const entries = (Array.isArray(body?.data) ? body.data : []).slice(0, WANT).map(pick);

	if (entries.length === 0) throw new Error("API returned no entries");

	payload.live = true;
	payload.fetchedAt = new Date().toISOString();
	payload.durationMs = Date.now() - started;
	payload.entries = entries;
	console.log(`fetch-anime: ${entries.length} live entries in ${payload.durationMs}ms`);
} catch (err) {
	warnings.push(String(err?.message ?? err));
	payload.entries = fallbackEntries;
	console.warn(`fetch-anime: ${warnings[0]}`);
	console.warn(
		`fetch-anime: falling back to the committed snapshot (${fallbackEntries.length} entries)`
	);
}

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(payload, null, "\t") + "\n");
console.log(`fetch-anime: -> ${OUT.replace(ROOT + "/", "")}`);
