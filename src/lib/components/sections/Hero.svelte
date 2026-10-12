<script>
	import SectionHeading from "../SectionHeading.svelte";
	import InlineBanner from "../InlineBanner.svelte";
	import Button from "../Button.svelte";
	import ButtonGroup from "../ButtonGroup.svelte";
	import BasicInfoDisplay from "../DataDisplay/BasicInfoDisplay.svelte";
	import BasicInfoDisplayGrouped from "../DataDisplay/BasicInfoDisplayGrouped.svelte";
	import Marquee from "../Marquee.svelte";
	import RequestExamples from "../RequestExamples.svelte";
	import {
		IconApi,
		IconArrowDownLeft,
		IconBrandDiscord,
		IconBrandPhp,
		IconChartLine,
		IconKeyOff,
		IconPackages
	} from "@tabler/icons-svelte";
</script>

<section class="hero">
	<main>
		<div class="left">
			<InlineBanner type="patreon" url="https://patreon.com/jikan"
				>We rely on you! Support us on Patreon</InlineBanner
			>

			<SectionHeading level={1}>
				{#snippet title()}Jikan API{/snippet}
				{#snippet subtitle()}Jikan (時間) is an unofficial & open-source API for the <strong
						>“most active online anime + manga community and database”</strong
					> — MyAnimeList.{/snippet}
			</SectionHeading>

			<BasicInfoDisplayGrouped>
				<BasicInfoDisplay
					urlTarget="_blank"
					url="https://github.com/jikan-me/jikan-rest"
					description="Visit the Jikan REST API's GitHub repository."
				>
					<IconApi size={20} stroke={1.5} />
					REST API
				</BasicInfoDisplay>
				<BasicInfoDisplay
					urlTarget="_blank"
					url="https://github.com/jikan-me/jikan"
					description="Visit the Jikan Parser API's GitHub repository."
				>
					<IconBrandPhp size={20} stroke={1.5} />
					Parser API
				</BasicInfoDisplay>
				<BasicInfoDisplay
					url="#integrations"
					urlTarget="_self"
					description="There's over 15+ available integrations made by the community."
				>
					<IconPackages size={20} stroke={1.5} />
					15+ Integrations
				</BasicInfoDisplay>
				<BasicInfoDisplay
					description="There are no tokens or auth required. Just start making requests."
				>
					<IconKeyOff size={20} stroke={1.5} />
					Auth-less
				</BasicInfoDisplay>
				<BasicInfoDisplay
					url="https://discord.jikan.moe"
					urlTarget="_blank"
					description="Click to join our discord server for help or just come say hi ✌️"
				>
					<IconBrandDiscord size={20} stroke={1.5} />
					Community Support
				</BasicInfoDisplay>
				<BasicInfoDisplay
					description="We're handling over 25~30+ million requests per week!"
				>
					<IconChartLine size={20} stroke={1.5} />
					100M+ requests / month
				</BasicInfoDisplay>
			</BasicInfoDisplayGrouped>

			<ButtonGroup>
				<Button type="primary" url="#features">Learn more</Button>

				<Button
					type="secondary-outline"
					urlTarget="_blank"
					url="https://docs.api.jikan.moe/"
				>
					<IconArrowDownLeft class="external-link" size={20} stroke={1.5} />
					Get started
				</Button>
			</ButtonGroup>
		</div>
		<div class="right">
			<RequestExamples />
		</div>
	</main>

	<Marquee />
</section>
