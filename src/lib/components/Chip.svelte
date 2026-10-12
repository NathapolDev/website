<script lang="ts">
	interface Props {
		type?: string;
		size?: string;
		length?: string;
		selectable?: boolean;
		children?: import("svelte").Snippet;
	}

	let {
		type = "default",
		size = "default",
		length = "default",
		selectable = false,
		children
	}: Props = $props();

	let isSelectable = $derived(!selectable ? "chip--selectable" : "");
</script>

<div class="chip chip--type-{type} chip--size-{size} chip--length-{length} {isSelectable}">
	<span>{@render children?.()}</span>
</div>

<style lang="scss">
	.chip {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		gap: 4px;
		color: var(--typography-100);
		border-radius: 8px;
		text-overflow: ellipsis;
		max-width: 200px;
		user-select: none;
		-webkit-user-drag: none;

		span {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			line-clamp: 1;
			-webkit-line-clamp: 1;
			align-self: stretch;
			text-overflow: ellipsis;
			overflow-wrap: break-word;
			overflow: hidden;
		}

		&--size {
			&-default {
				font-size: var(--type-size-body-content);
				padding: 8px 8px;
			}

			&-small {
				font-size: var(--type-size-body-assistive);
				padding: 8px 8px;
			}

			&-xsmall {
				font-size: var(--type-size-body-assistive);
				padding: 2px 4px;
			}
		}

		&--type {
			&-flat {
				background: var(--background-300);
			}

			&-outline {
				border: 1px solid var(--background-500);
			}

			&-outline-gradient {
				background:
					linear-gradient(var(--background-100), var(--background-100)) padding-box,
					linear-gradient(
							to right,
							var(--border-default-gradient-color-start),
							var(--border-default-gradient-color-stop)
						)
						border-box;
				border-radius: var(--border-radius-small);
				border: 1px solid transparent;
			}

			&-outline-gradient-light {
				background:
					linear-gradient(var(--background-200), var(--background-200)) padding-box,
					linear-gradient(
							to right,
							var(--border-default-gradient-color-start),
							var(--border-default-gradient-color-stop)
						)
						border-box;
				border-radius: var(--border-radius-small);
				border: 1px solid transparent;
			}

			&-animeStatus {
				&-airing {
					border: 1px solid var(--background-500);
					color: var(--status-airing);
				}

				&-finished {
					border: 1px solid var(--background-500);
					color: var(--status-finished);
				}

				&-upcoming {
					border: 1px solid var(--background-500);
					color: var(--status-upcoming);
				}
			}

			&-request {
				background: var(--status-request-bg);
				color: var(--status-request-fg);
				letter-spacing: 1px;
			}
		}

		&--length {
			&-small {
				span {
					max-width: 50px;
				}
			}
		}
	}
</style>
