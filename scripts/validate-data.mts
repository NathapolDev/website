#!/usr/bin/env node
/**
 * Validates the hand-maintained data files in src/data/.
 *
 * These files are appended to by contributors following README instructions, so
 * this enforces the rules the README documents but nothing else checks:
 * required fields, https URLs, direct image links, and no duplicates.
 *
 * Run with: npm run validate:data
 */
import showcase from "../src/data/showcase.ts";
import integrations from "../src/data/integrations.ts";
import features from "../src/data/features.ts";

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|avif)$/i;

let total = 0;

const problems = [];
const warnings = [];

function fail(file, index, field, message) {
	problems.push(`${file}[${index}].${field}: ${message}`);
}

/** Policy breaches reported by the maintainers rather than treated as build failures. */
function warn(file, index, field, message) {
	warnings.push(`${file}[${index}].${field}: ${message}`);
}

/** Validates a URL string, returning an error message or null. */
function checkUrl(value, { requireImageExtension = false } = {}) {
	if (typeof value !== "string" || value.length === 0) return "missing";
	if (value.startsWith("http://")) return "must use https, not http";
	try {
		new URL(value);
	} catch {
		return "not a valid URL";
	}
	if (requireImageExtension && !IMAGE_EXT.test(value.split("?")[0])) {
		return "IMAGE";
	}
	return null;
}

function validate(file, list, spec) {
	list.forEach((entry, index) => {
		for (const [field, rules] of Object.entries(spec)) {
			const value = entry?.[field];
			if (rules.required && (value === undefined || value === null)) {
				fail(file, index, field, "is required but missing");
				continue;
			}
			if (value === undefined || value === null) continue;

			if (typeof value !== rules.type) {
				fail(file, index, field, `expected ${rules.type}, got ${typeof value}`);
				continue;
			}
			if (rules.url) {
				const err = checkUrl(value, {
					requireImageExtension: rules.url === "!image"
				});
				if (err === "IMAGE") {
					warn(
						file,
						index,
						field,
						"should be a direct link to an image file on IMGUR/GitHub, not a page URL"
					);
				} else if (err) {
					fail(file, index, field, err);
				}
			}
			if (rules.nonEmptyString && String(value).trim() === "") {
				fail(file, index, field, "must not be empty");
			}
		}
	});

	// Duplicate detection on the canonical link.
	const seen = new Map();
	list.forEach((entry, index) => {
		const key = entry?.url;
		if (typeof key !== "string") return;
		if (seen.has(key)) {
			fail(file, index, "url", `duplicates entry ${seen.get(key)} (${key})`);
		} else {
			seen.set(key, index);
		}
	});

	console.log(`  ${file}: ${list.length} entries checked`);
	return list.length;
}

console.log("Validating src/data/");
total += validate("showcase", showcase, {
	title: { type: "string", required: true, nonEmptyString: true },
	summary: { type: "string", required: true, nonEmptyString: true },
	imageUrl: { type: "string", required: true, url: "!image" },
	url: { type: "string", required: true, url: true }
});

total += validate("integrations", integrations, {
	type: { type: "string", required: true, nonEmptyString: true },
	author: { type: "string", required: true, nonEmptyString: true },
	title: { type: "string", required: true, nonEmptyString: true },
	language: { type: "string", required: true, nonEmptyString: true },
	supportsV3: { type: "boolean", required: true },
	supportsV4: { type: "boolean", required: true },
	url: { type: "string", required: true, url: true }
});

total += validate("features", features.available, {
	label: { type: "string", required: true, nonEmptyString: true },
	description: { type: "string", required: true, nonEmptyString: true },
	onVersion: { type: "number", required: true }
});
total += validate("features.upcoming", features.upcoming, {
	label: { type: "string", required: true, nonEmptyString: true },
	description: { type: "string", required: true, nonEmptyString: true },
	onVersion: { type: "number", required: true }
});

console.log("");
if (warnings.length > 0) {
	console.log(`${warnings.length} warning(s) - policy issues, not build failures:`);
	for (const w of warnings) console.log("  " + w);
	console.log("");
}

if (problems.length === 0) {
	console.log(`OK - ${total} entries across 4 collections passed.`);
	process.exit(warnings.length > 0 ? 0 : 0);
}

console.error(`FAILED - ${problems.length} problem(s) found:\n`);
for (const p of problems) console.error("  " + p);
console.error("");
process.exit(1);
