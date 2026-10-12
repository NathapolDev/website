import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import prettier from "eslint-config-prettier";
import ts from "typescript-eslint";

export default [
	js.configs.recommended,
	...ts.configs.recommended,
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
			"no-undef": "error",
			// TypeScript already reports unused bindings with full type information,
			// so the base rule would double-report every typed file.
			"no-unused-vars": "off",
			// Requires SvelteKit 3's resolve() for internal links. Most of our
			// flagged sites pass a dynamic `url` prop that may well be an external
			// link, which resolve() is not designed for. Adopting this properly
			// means distinguishing the two at each call site and testing the
			// result under a non-root base path - that belongs with the Kit 3
			// upgrade, not as a drive-by rewrite.
			"svelte/no-navigation-without-resolve": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
			]
		}
	},
	{
		// Rune modules are TypeScript too, so they need the TS parser rather
		// than the default JS one.
		files: ["**/*.svelte.ts", "**/*.svelte.js"],
		languageOptions: {
			parser: ts.parser
		}
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				// Parse <script lang="ts"> blocks with the TypeScript parser.
				parser: ts.parser
			}
		}
	},
	{
		// Runes are compiler macros, so they have no runtime binding ESLint can
		// resolve. Declare them for rune modules (.svelte.ts / .svelte.js).
		files: ["**/*.svelte.ts", "**/*.svelte.js"],
		languageOptions: {
			globals: {
				$state: "readonly",
				$derived: "readonly",
				$effect: "readonly",
				$props: "readonly",
				$bindable: "readonly",
				$inspect: "readonly",
				$host: "readonly"
			}
		}
	},
	{
		ignores: ["build/", ".svelte-kit/", "node_modules/", "static/"]
	}
];
