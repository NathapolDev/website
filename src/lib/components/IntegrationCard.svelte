<script lang="ts">
	import { href } from "../helpers/href";
	import Chip from "./Chip.svelte";

	import { IconArrowDownLeft } from "@tabler/icons-svelte";
	import Divider from "./Divider.svelte";
	interface Props {
		supportsV3?: boolean;
		supportsV4?: boolean;
		author?: string | null;
		title?: string | null;
		language?: string | null;
		url?: string | null;
	}

	let {
		supportsV3 = false,
		supportsV4 = false,
		author = null,
		title = null,
		language = null,
		url = null
	}: Props = $props();
</script>

<a href={href(url)} class="cardIntegrations">
	<div class="cardIntegrations__metaWrapper">
		<div class="cardIntegrations__meta">
			<div class="cardIntegrations__title">
				<div
					class="cardIntegrations__languageBlip cardIntegrations__languageBlip--{language}"
				></div>
				<p>{title}</p>
			</div>

			<div class="cardIntegrations__sub">
				<p>{language}</p>
				<Divider />
				<p class="cardIntegrations__author">By <span>{author}</span></p>
			</div>
		</div>

		<span class="icon"><IconArrowDownLeft class="external-link" size={20} stroke={1.5} /></span>
	</div>
	<div class="cardIntegrations__versions">
		{#if supportsV3}
			<Chip type="outline" size="small">v3</Chip>
		{/if}
		{#if supportsV4}
			<Chip type="outline-gradient-light" size="small">v4</Chip>
		{/if}
	</div>
</a>

<style lang="scss">
	.cardIntegrations {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 16px;
		gap: 8px;
		width: fit-content;
		min-width: 200px;
		max-width: 250px;

		background: var(--background-raised);
		border: 1px solid var(--background-400);
		border-radius: var(--border-radius-large);
		flex: 1;
		transition: all 0.5s ease;

		&__metaWrapper {
			display: grid;
			grid-template-columns: auto 20px;
			padding: 0;
			gap: 8px;
			width: 100%;

			.icon {
				transition: all 0.5s ease-in-out 0.1s;
			}
		}

		&__title {
			font-weight: bold;
			display: flex;
			align-items: center;
			gap: 8px;
			color: var(--typography-100);

			p {
				margin: 0;
			}
		}

		&__meta {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			padding: 0;
			color: var(--typography-300);
		}

		&__sub {
			display: flex;
			align-items: center;
			gap: 4px;
			font-size: 12px;

			p {
				margin: 0;
				// Measured at 4.31:1 on the light card surface, just under AA.
				color: var(--typography-200);
				text-transform: capitalize;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 80px;
			}
		}

		&__author {
			color: var(--typography-100);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 50px;
		}

		&__languageBlip {
			height: 10px;
			width: 10px;
			border-radius: 100%;

			&--php {
				background: var(--language-php);
			}

			&--javascript {
				background: var(--language-javascript);
			}

			&--typescript {
				background: var(--language-javascript);
			}

			&--nodejs {
				background: var(--language-nodejs);
			}

			&--dart {
				background: var(--language-dart);
			}

			&--go {
				background: var(--language-go);
			}

			&--elixir {
				background: var(--language-elixir);
			}

			&--kotlin {
				background: var(--language-kotlin);
			}

			&--java {
				background: var(--language-java);
			}

			&--dotnet {
				background: var(--language-dotnet);
			}

			&--python {
				background: var(--language-python);
			}

			&--ruby {
				background: var(--language-ruby);
			}
		}

		&:hover {
			background: var(--background-400);
			border: 1px solid var(--background-500);

			.cardIntegrations__metaWrapper {
				.icon {
					transform: translate(5px, -5px);
				}
			}
		}
	}

	@media screen and (max-width: 700px) {
		.cardIntegrations {
			min-width: unset;
			max-width: unset;
			width: 100%;
			flex-direction: row;
			flex: unset;

			&__versions {
				display: flex;
				gap: 8px;
			}
		}
	}
</style>
