<script lang="ts">
	import Button from "./Button.svelte";
	import { IconArrowDownLeft, IconGitFork } from "@tabler/icons-svelte";
	import Logo from "../images/Logo.svelte";

	/**
	 * The footer's link columns.
	 *
	 * These used to be three hand-written <div> blocks. They drifted: one had an
	 * empty <li> placeholder, another had a link with no href, and they had to be
	 * edited in parallel by hand. Declaring them once keeps that from happening.
	 */
	/** One footer link. `external` gets target="_blank", `icon` shows the arrow. */
	interface FooterLink {
		label: string;
		url: string;
		external?: boolean;
		icon?: boolean;
	}

	interface FooterColumn {
		heading: string;
		links: FooterLink[];
	}

	const FOOTER_LINKS: FooterColumn[] = [
		{
			heading: "General",
			links: [
				{ label: "Features", url: "/#features" },
				{ label: "Showcase", url: "/showcase" },
				{ label: "Integrations", url: "/#integrations" }
			]
		},
		{
			heading: "Developers",
			links: [
				{
					label: "Documentation",
					url: "https://docs.api.jikan.moe/",
					external: true,
					icon: true
				}
			]
		},
		{
			heading: "Community",
			links: [
				{ label: "Discord", url: "http://discord.jikan.moe/", external: true },
				{ label: "GitHub Org", url: "https://github.com/jikan-me", external: true },
				{ label: "Reddit", url: "https://www.reddit.com/r/jikan/", external: true }
			]
		}
	];
</script>

<footer class="footer">
	<div class="footer__body">
		<div class="footer__content">
			<div class="footer__brand">
				<a href="https://jikan.moe" class="logo"><Logo /></a>
				<p>Unofficial MyAnimeList API</p>
			</div>

			<div class="footer__linksWrapper">
				{#each FOOTER_LINKS as column (column.heading)}
					<div class="footer__links">
						<strong>{column.heading}</strong>
						<ul>
							{#each column.links as link (link.url)}
								<li>
									<Button
										url={link.url}
										urlTarget={link.external ? "_blank" : "_self"}
										type="link"
									>
										{#if link.icon}<IconArrowDownLeft
												size={20}
												stroke={1.5}
											/>{/if}
										{link.label}
									</Button>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>
</footer>

<div class="copyright">
	<div class="copyright__content">
		<span>2017 - {new Date().getFullYear()} Jikan.moe</span>
		<span
			>This website is open-source. <Button
				type="link"
				size="small"
				urlTarget="_blank"
				url="https://github.com/jikan-me/website"
				><IconGitFork size={16} stroke={1.5} />Help make it better</Button
			>.</span
		>
	</div>
</div>

<style lang="scss">
	// The logo SVG uses fill="currentColor", so it picks up the active theme.
	.logo {
		color: var(--typography-100);
	}

	.footer {
		padding: 100px 0;
		align-items: center;
		justify-content: center;
		display: flex;
		width: 100%;
		background: var(--background-100);

		&__body {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 64px;
			width: var(--content-width);
		}

		&__brand {
			p {
				color: var(--typography-300);
			}
		}

		&__content {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
		}

		&__linksWrapper {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			gap: 64px;
		}

		&__links {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 32px;

			ul {
				margin: 0;
				padding: 0;
				display: flex;
				flex-direction: column;
				gap: 16px;
			}

			li {
				list-style: none;
				margin: 0;
				padding: 0;
			}
		}
	}

	.copyright {
		box-sizing: border-box;
		padding: 32px;
		align-items: center;
		justify-content: center;
		display: flex;
		width: 100%;
		background: var(--background-000);

		&__content {
			font-size: 12px;
			display: flex;
			justify-content: space-between;
			color: var(--typography-300);
			align-items: center;
			gap: 64px;
			width: var(--page-width);

			span {
				display: flex;
				align-items: center;
			}
		}
	}

	@media screen and (max-width: 1000px) {
		.footer {
			padding: 100px 16px;
			box-sizing: border-box;

			&__content {
				flex-direction: column;
				gap: 64px;
			}

			&__linksWrapper {
				flex-direction: column;
			}
		}

		.copyright {
			flex-direction: column;
			padding: 16px;

			&__content {
				flex-direction: column;
				gap: 32px;
				width: 90vw;

				span {
					display: inline;
				}
			}
		}
	}
</style>
