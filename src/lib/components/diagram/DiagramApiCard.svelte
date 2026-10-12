<script lang="ts">
	import type { Snippet } from "svelte";
	import {
		IconArrowDownLeft,
		IconGitFork,
		IconHelp,
		IconInfoCircle,
		IconStar
	} from "@tabler/icons-svelte";
	import Button from "../Button.svelte";
	import ButtonGroup from "../ButtonGroup.svelte";
	import Chip from "../Chip.svelte";
	import Divider from "../Divider.svelte";
	import InputReadOnly from "../InputReadOnly.svelte";
	import { tooltip } from "../../actions/tooltip";
	import type { GithubRepo } from "../../types/github";

	/**
	 * One API panel in the "How does this work?" diagram.
	 *
	 * The diagram shows two of these - the REST API and the PHP API - and they
	 * were previously two hand-copied blocks that had drifted apart. Only the
	 * copy differs between them, so that is all this takes; the structure,
	 * divider, repo stats and button stack are defined once here.
	 *
	 * `description` is a snippet rather than a string because the PHP API's copy
	 * contains a deliberate paragraph break.
	 */

	type SecondaryLink = {
		url: string;
		label: string;
		/** Text for the help icon beside the label. */
		tooltip?: string;
	};

	let {
		title,
		version,
		subtitle,
		description,
		repo,
		repoUrl,
		installId,
		installValue,
		installUrl,
		docsUrl,
		secondary
	}: {
		title: string;
		version: string;
		subtitle: string;
		description: Snippet;
		repo?: GithubRepo;
		repoUrl: string;
		installId: string;
		installValue: string;
		installUrl: string;
		docsUrl: string;
		secondary?: SecondaryLink;
	} = $props();
</script>

<div class="cardDiagramInfo">
	<div class="cardDiagramInfo__meta">
		<div class="type--group-heading-and-subheading">
			<h6 class="cardDiagramInfo__title">
				{title}
				<Chip type="outline" size="xsmall">{version}</Chip>
			</h6>
			<p class="cardDiagramInfo__subtitle">{subtitle}</p>
		</div>

		{#if repo}
			<div class="cardDiagramInfo__repoStats">
				<Button urlTarget="_blank" url={repoUrl} type="link">
					<IconStar size={20} stroke={1.5} />
					{repo.stargazers_count} stars
				</Button>
				<Button urlTarget="_blank" url="{repoUrl}/forks" type="link">
					<IconGitFork size={20} stroke={1.5} />
					{repo.forks_count} forks
				</Button>
			</div>
		{/if}
	</div>

	<Divider type="line"></Divider>

	<p class="cardDiagramInfo__about">
		{@render description()}
	</p>

	<div class="cardDiagramInfo__package">
		<InputReadOnly id={installId} isCopyable value={installValue} />

		<Button type="tertiary" size="small" url={installUrl} urlTarget="_blank">
			<IconInfoCircle size={20} stroke={1.5} />
		</Button>
	</div>

	<ButtonGroup type="stacked">
		<Button urlTarget="_blank" url={docsUrl} type="primary" size="full-width">
			<IconArrowDownLeft class="external-link" size={20} stroke={1.5} />
			View Documentation
		</Button>

		{#if secondary}
			<Button type="link" size="small" url={secondary.url} urlTarget="_blank">
				{secondary.label}
				{#if secondary.tooltip}
					<span
						use:tooltip={{
							content: secondary.tooltip,
							animation: "slide"
						}}><IconHelp size={20} stroke={1.5} /></span
					>
				{/if}
			</Button>
		{/if}
	</ButtonGroup>
</div>
