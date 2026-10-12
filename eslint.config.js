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
			// SvelteKit 3 rule that wants every internal link written as
			// href={resolve(...)}. It only accepts a literal resolve() call, so it
			// cannot be satisfied where a `url` prop may hold either an internal
			// route or an external URL - calling resolve() on "https://github.com/x"
			// returns "/https://github.com/x". Those sites go through the href()
			// helper in src/lib/helpers/href.ts, which resolves only root-relative
			// paths and passes everything else through untouched. Sites with a
			// statically known route use resolve() directly.
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
