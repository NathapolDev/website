<script>
	import Button from "../Button.svelte";
	import ButtonGroup from "../ButtonGroup.svelte";
	import BasicInfoDisplay from "../DataDisplay/BasicInfoDisplay.svelte";
	import BasicInfoDisplayGrouped from "../DataDisplay/BasicInfoDisplayGrouped.svelte";
	import Chip from "../Chip.svelte";
	import Banner from "../Banner.svelte";
	import ShowcaseBackground from "../../images/showcase-background.webp";
	import { IconArrowDownLeft, IconArrowNarrowRight, IconCirclePlus } from "@tabler/icons-svelte";
	import features from "../../../data/features";
</script>

<section class="featuresWrapper" id="features">
	<div class="features">
		<div class="left">
			<div class="open-source">
				<div class="type--group-heading-and-content">
					<h2>Free & Open Source</h2>
					<h3 style="display: flex">
						— all under <Button
							type="link-heading"
							urlTarget="_blank"
							url="https://choosealicense.com/licenses/mit/"
							><IconArrowDownLeft class="external-link" size={32} stroke={1.5} />MIT
							Licensing</Button
						>
					</h3>
					<p>
						Focus on building while we keep the requests rolling. With nearly limitless
						quota on requests, you have the freedom to create without the need of
						writing/updating your own parsers or depending on limited API support. Want
						to launch your own private Jikan API? Go ahead.
					</p>
				</div>

				<Button type="primary" url="https://github.com/jikan-me" urlTarget="_blank">
					<IconArrowDownLeft class="external-link" size={20} stroke={1.5} />
					Visit GitHub organization
				</Button>
			</div>

			<div
				class="showcaseCover margin--top-64"
				style="background-image: url({ShowcaseBackground})"
			>
				<div class="overlay">
					<div class="type--group-heading-and-content">
						<h2>⚡ Powered by Jikan</h2>
						<p>
							Jikan was launched in late 2017 and has grown rapidly since. It is now
							handling over 25+ million requests weekly, <strong>free of cost</strong
							>.<br /><br /> A public showcase is available where you can view apps
							and projects using Jikan and even <strong>add your own</strong> there!
						</p>
					</div>

					<ButtonGroup>
						<Button url="/showcase" type="secondary-outline" size="full-width">
							View all apps
							<IconArrowNarrowRight size={20} stroke={1.5} />
						</Button>
						<Button
							url="https://github.com/jikan-me/website/edit/master/src/data/showcase.js"
							type="tertiary"
							size="full-width"
						>
							<IconCirclePlus size={20} stroke={1.5} />
							Add my project
						</Button>
					</ButtonGroup>
				</div>
			</div>
		</div>

		<div class="right">
			<div class="type--group-heading-and-content">
				<h2>Features</h2>
				<p>
					Jikan has a significant coverage over public MyAnimeList pages with more
					upcoming features on the roadmap.
				</p>
			</div>

			<Banner type="info" size="small">
				Jikan only supports non-authenticated requests. This means, you can not authenticate
				a user, manage user lists, post, etc. Use the official API for those tasks.
			</Banner>

			<div>
				<h3>Available</h3>
				<BasicInfoDisplayGrouped>
					{#each features.available as feature (feature.label)}
						<BasicInfoDisplay description={feature.description}>
							<feature.icon size={20} stroke={1.5} />
							{#if feature.highlight}
								<Chip type="outline-gradient-light" size="small"
									>v{feature.onVersion}</Chip
								>
							{:else}
								<Chip type="outline" size="small">v{feature.onVersion}</Chip>
							{/if}
							{feature.label}
						</BasicInfoDisplay>
					{/each}
				</BasicInfoDisplayGrouped>
			</div>

			<div>
				<h3>Upcoming</h3>
				<BasicInfoDisplayGrouped>
					{#each features.upcoming as feature (feature.label)}
						<BasicInfoDisplay disabled description={feature.description}>
							<feature.icon size={20} stroke={1.5} />
							<Chip type="outline" size="small">v{feature.onVersion}</Chip>
							{feature.label}
						</BasicInfoDisplay>
					{/each}
				</BasicInfoDisplayGrouped>
			</div>

			<Button
				urlTarget="_blank"
				url="https://github.com/orgs/jikan-me/projects/2"
				type="primary"
			>
				<IconArrowDownLeft class="external-link" size={20} stroke={1.5} />
				View Roadmap
			</Button>
		</div>
	</div>
</section>
