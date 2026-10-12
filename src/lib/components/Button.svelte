<script lang="ts">
	import { href } from "../helpers/href";
	interface Props {
		type?: string;
		size?: string;
		url?: string | null;
		urlTarget?: "_self" | "_blank" | "_parent" | "_top";
		callback?: (() => void) | null;
		/** Called on click. Replaces the `message` component event removed in Svelte 5. */
		onmessage?: (() => void) | null;
		children?: import("svelte").Snippet;
	}

	let {
		type = "primary",
		size = "default",
		url = null,
		urlTarget = "_self",
		callback = null,
		onmessage = null,
		children
	}: Props = $props();

	function onClick() {
		onmessage?.();
		callback?.();
	}
</script>

<a
	href={href(url)}
	target={url ? urlTarget : null}
	class="button button--type-{type} button--size-{size}"
	onclick={onClick}
>
	{@render children?.()}
</a>

<style lang="scss">
	.button {
		display: inline-flex;
		gap: 8px;
		color: var(--typography-100);
		transition: all 0.25s ease;
		align-items: center;
		justify-content: center;
		border-radius: var(--border-radius-small);
		user-select: none;
		max-width: fit-content;
		cursor: pointer;

		&:active {
			transform: translateY(5px);
		}

		&--size {
			&-default {
				padding: 16px 24px;
			}

			&-small {
				padding: 8px 16px;
				font-size: 12px;
			}

			&-full-width {
				width: -webkit-fill-available;
				max-width: unset;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 16px 24px;
			}
		}

		&--type {
			&-primary {
				background: var(--background-button-primary-default);
				// Always a light label: this sits on the brand blue, so following
				// --typography-100 made it near-illegible in the light theme.
				color: #f4f7ff;

				&:hover {
					background: var(--background-button-primary-hover);
				}
			}

			&-secondary-outline {
				border: 1px solid var(--background-300);

				&:hover {
					border: 1px solid var(--background-500);
				}
			}

			&-tertiary {
				text-decoration: underline;

				&:hover {
					background: var(--background-raised);
				}
			}

			&-link {
				text-decoration: underline;
				padding: 0;
				margin-left: 8px;
			}

			&-link-heading {
				text-decoration: underline;
				padding: 0;
				margin: 0 0 0 8px;
			}

			&-link-assistive {
				text-decoration: underline;
				padding: 0;
				margin: 0;
				gap: 2px;
			}
		}
	}

	@media screen and (max-width: 1250px) {
		.button {
			&--size {
				&-default {
					padding: 16px 12px;
				}

				&-small {
					padding: 4px 8px;
					font-size: 12px;
				}

				&-full-width {
					padding: 16px 12px;
				}
			}
		}
	}

	@media screen and (max-width: 1000px) {
		.button {
			&--type {
				&-nav-link,
				&-nav-icon-link {
					display: flex;
					padding: 32px 64px;
					font-size: var(--type-size-heading-3);
					width: 100%;

					&:hover {
						background: rgba(255, 255, 255, 0.1);
					}
				}
			}
		}
	}

	@media screen and (max-width: 700px) {
		.button {
			width: -webkit-fill-available;
			max-width: unset;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 16px 24px;

			&--type-link,
			&--type-link-heading,
			&--type-link-assistive {
				display: inline;
				padding: 0 4px;
				margin: 0;
			}
		}
	}
</style>
