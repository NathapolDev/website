import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
	js.configs.recommended,
	...svelte.configs["flat/recommended"],
	prettier,
	...svelte.configs["flat/prettier"],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			// Svelte 4 still ships legacy reactive syntax in a few places and
			// the codebase relies on component instance methods being called
			// from the markup, which svelte/no-at-html-tags style checks flag
			// noisily. Keep the rule set pragmatic rather than aspirational.
			"no-undef": "error",
			"no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
		}
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				parser: js
			}
		}
	},
	{
		ignores: ["build/", ".svelte-kit/", "node_modules/", "static/"]
	}
];
