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
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
			]
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
		ignores: ["build/", ".svelte-kit/", "node_modules/", "static/"]
	}
];
