<script>
	import Button from "../Button.svelte";
	import Divider from "../Divider.svelte";
	import IntegrationCard from "../IntegrationCard.svelte";
	import {
		IconApi,
		IconCirclePlus,
		IconGitCommit,
		IconHeartHandshake
	} from "@tabler/icons-svelte";
	import integrations from "../../../data/integrations";
</script>

<section class="integrationsWrapper" id="integrations">
	<div class="integrations">
		<div class="left">
			<div class="type--group-heading-and-content">
				<h2>Seamless integration with the languages you use and love.</h2>
			</div>

			<div class="integrations__body margin--top-64">
				<div class="integrations__about">
					<div class="integrations__aboutIcon">
						<IconHeartHandshake size={35} stroke={1.5} />
					</div>

					<div>
						<h6>By the community, for the community</h6>
						<p>
							Thanks to avid contributors, there are a multitude of wrappers available
							so you can easily use it with the language of your choice.
						</p>
					</div>
				</div>

				<div class="integrations__about">
					<div class="integrations__aboutIcon">
						<IconGitCommit size={35} stroke={1.5} />
					</div>

					<div>
						<h6>Create or contribute to an integration</h6>
						<p>
							Get involved by writing or maintaining an integration in the programming
							language of your choice.
						</p>
					</div>
				</div>

				<div class="integrations__about">
					<div class="integrations__aboutIcon">
						<IconApi size={35} stroke={1.5} />
					</div>

					<div>
						<h6>OpenAPI 3.1 Specifications</h6>
						<p>
							Generate wrappers on the fly as our documentation is built on <Button
								type="link"
								url="https://raw.githubusercontent.com/jikan-me/jikan-rest/master/storage/api-docs/api-docs.json"
								urlTarget="_blank">OpenAPI 3.1</Button
							> Specs.
						</p>
					</div>
				</div>
			</div>

			<Divider type="line"></Divider>

			<Button
				url="https://github.com/jikan-me/website/edit/master/src/data/integrations.js"
				type="secondary-outline"
				size="full-width"
			>
				<IconCirclePlus size={20} stroke={1.5} />
				Add your integration here
			</Button>
		</div>

		<div class="right">
			<div class="type--group-heading-and-content">
				<h6>Available Integrations ({integrations.length})</h6>
			</div>

			<div class="integrations__listing">
				<div class="integrations__fadeout integrations__fadeout--top"></div>
				{#each integrations as integration}
					<IntegrationCard
						supportsV3={integration.supportsV3}
						supportsV4={integration.supportsV4}
						author={integration.author}
						title={integration.title}
						language={integration.language}
						url={integration.url}
					></IntegrationCard>
				{/each}
				<div class="integrations__fadeout integrations__fadeout--bottom"></div>
			</div>
		</div>
	</div>
</section>
