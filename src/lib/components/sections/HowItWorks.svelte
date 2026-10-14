<script lang="ts">
	import Connector from "../diagram/Connector.svelte";
	import DiagramApiCard from "../diagram/DiagramApiCard.svelte";
	import DiagramFlow from "../diagram/DiagramFlow.svelte";
	import SectionHeading from "../SectionHeading.svelte";
	import Contributors from "./Contributors.svelte";
	import type { GithubData } from "../../types/github";
	/**
	 * Repository stats and contributor avatars, fetched at build time by
	 * scripts/fetch-github.mjs. Always fully populated: the script emits an
	 * empty-but-valid payload rather than failing when GitHub is unreachable.
	 */
	interface Props {
		github: GithubData;
	}

	let { github }: Props = $props();
</script>

<section class="howItWorksWrapper" id="how-it-works">
	<div class="howItWorks">
		<SectionHeading centered>
			{#snippet title()}How does this work?{/snippet}
			{#snippet subtitle()}
				Jikan scrapes public MyAnimeList pages.<br />The service consists of two core parts.
			{/snippet}
		</SectionHeading>

		<div class="diagram">
			<div class="diagram__flow">
				<DiagramApiCard
					title="Jikan REST API"
					version="v4.2.3"
					subtitle="— via Lumen/Laravel"
					repo={github.jikan_rest}
					repoUrl="https://github.com/jikan-me/jikan-rest"
					docsUrl="https://docs.api.jikan.moe/"
					installId="docker"
					installValue="docker pull jikanme/jikan-rest"
					installUrl="https://hub.docker.com/r/jikanme/jikan-rest"
					secondary={{
						url: "https://jikan.docs.apiary.io",
						label: "Looking for v3 Documentation?",
						tooltip: "Why are you still looking for this? ಠ_ಠ"
					}}
				>
					{#snippet description()}
						The REST API is responsible for using the Jikan PHP API to parse MAL It
						deals with handling the requests and maintaining a queryable database.
						Anyone can host their own instance of it.
					{/snippet}
				</DiagramApiCard>

				<Connector orientation="horizontal" />

				<DiagramFlow />

				<Connector orientation="horizontal" />

				<DiagramApiCard
					title="Jikan PHP API"
					version="v4.0.11"
					subtitle="— Parser API"
					repo={github.jikan}
					repoUrl="https://github.com/jikan-me/jikan"
					docsUrl="https://docs.jikan.moe/"
					installId="composer"
					installValue="composer install jikan-me/jikan"
					installUrl="https://packagist.org/packages/jikan-me/jikan"
				>
					{#snippet description()}
						The PHP API is the parser itself. It's responsible for scraping data
						available on public MyAnimeList.net pages.
						<br /><br />It returns the parsed data as per the request's respective
						model.
					{/snippet}
				</DiagramApiCard>
			</div>

			<Contributors contributors={github.contributors} />
		</div>
	</div>
</section>
